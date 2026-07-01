$(function () {
  const signs = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];
  const signContainer = document.getElementById('signs');
  const hourHand = document.getElementById('hourHand');
  const minuteHand = document.getElementById('minuteHand');
  const timeDisplay = document.getElementById('timeDisplay');
  const matchPercent = document.getElementById('matchPercent');
  const matchText = document.getElementById('matchText');
  const hourSign = document.getElementById('hourSign');
  const minuteSign = document.getElementById('minuteSign');

  signs.forEach((label, index) => {
    const element = document.createElement('div');
    element.className = 'sign';
    element.textContent = label;
    const angle = index * 30;
    element.style.transform = `rotate(${angle}deg) translateY(-155px) rotate(-${angle}deg)`;
    signContainer.appendChild(element);
  });

  function updateClock() {
    const now = new Date();
    const hours = now.getHours() % 12;
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    const hourIndex = hours;
    const minuteIndex = Math.floor(minutes / 5);

    const hourAngle = (hours * 30) + (minutes / 60) * 30;
    const minuteAngle = (minuteIndex * 30) + (minutes % 5) * 6;
    const secondAngle = seconds * 6;

    hourHand.style.transform = `rotate(${hourAngle}deg)`;
    minuteHand.style.transform = `rotate(${minuteAngle}deg)`;

    timeDisplay.textContent = now.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });

    hourSign.textContent = signs[hourIndex];
    minuteSign.textContent = signs[minuteIndex];

    const matchScore = 70 + ((hourIndex + 1) * 3 + (minuteIndex + 1) * 2 + (seconds % 7)) % 24;
    matchPercent.textContent = `${matchScore}%`;

    const mood = matchScore >= 88 ? 'A glowing cosmic match' : matchScore >= 80 ? 'A warm celestial bond' : 'A curious cosmic spark';
    matchText.textContent = mood;

    document.body.style.setProperty('--glow-angle', `${secondAngle}deg`);
  }

  updateClock();
  setInterval(updateClock, 1000);
});
