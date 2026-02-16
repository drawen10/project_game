import { initGame } from './game.js';

window.addEventListener('load', () => {
  console.log('app.js load event fired');
  const playBtn = document.getElementById('play-btn');
  if (!playBtn) {
    console.error('❌ Couldnt find #play-btn element!');
    return;
  }
  console.log('✅ playBtn found:', playBtn);

  playBtn.addEventListener('click', () => {
    console.log('🔘 Clicked on Play ');
    const nameInput = document.getElementById('player-name');
    const diffSelect = document.getElementById('difficulty');
    if (!nameInput || !diffSelect) {
      console.error('❌ Missing #player-name or #difficulty element');
      return;
    }

    const name = nameInput.value.trim();
    const difficulty = diffSelect.value;
    console.log('→ Name:', name, 'Difficulty:', difficulty);

    if (!name) {
      alert('Please give us your name!');
      return;
    }

    document.getElementById('start-screen').classList.add('hidden');
    document.getElementById('game-screen').classList.add('active');

    initGame({ name, difficulty });
  });
});
