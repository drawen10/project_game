import { initGame } from './game.js';

window.addEventListener('load', () => {
  console.log('app.js load event fired');
  const playBtn = document.getElementById('play-btn');
  if (!playBtn) {
    console.error('❌ Nem találom a #play-btn elemet!');
    return;
  }
  console.log('✅ playBtn megtalálva:', playBtn);

  playBtn.addEventListener('click', () => {
    console.log('🔘 Play gombra kattintottak');
    const nameInput = document.getElementById('player-name');
    const diffSelect = document.getElementById('difficulty');
    if (!nameInput || !diffSelect) {
      console.error('❌ Hiányzó #player-name vagy #difficulty elem');
      return;
    }

    const name = nameInput.value.trim();
    const difficulty = diffSelect.value;
    console.log('→ Név:', name, 'nehézség:', difficulty);

    if (!name) {
      alert('Kérlek, add meg a neved!');
      return;
    }

    document.getElementById('start-screen').classList.add('hidden');
    document.getElementById('game-screen').classList.remove('hidden');

    initGame({ name, difficulty });
  });
});
