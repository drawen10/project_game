import { levels } from './evolutions.js';
import { createGrid, spawnTile } from './grid.js';
import { updateUI } from './ui.js';
import { initTooltip } from './tooltip.js';

export function initGame({ name, difficulty }) {
  console.log('🚀 initGame meghívódott', { name, difficulty });
  const lvl = levels[difficulty];
  const state = {
    name,
    difficulty,
    cols: lvl.cols,
    rows: lvl.rows,
    timeLeft: lvl.time * 60,
    score: 0,
    grid: createGrid(lvl.cols, lvl.rows)
  };

  // kezdő tile-ok
  for (let i = 0; i < lvl.cols; i++) {
    spawnTile(state.grid);
  }

  updateUI(state);
  initTooltip();

  console.log('🔧 Játék állapot inicializálva', state);

  // időzítő
  const timerId = setInterval(() => {
    state.timeLeft--;
    if (state.timeLeft <= 0) {
      clearInterval(timerId);
      console.log('⏰ Idő lejárt, game over');
      endGame(state);
    }
    updateUI(state);
  }, 1000);
}

function endGame(state) {
  console.log('🏁 Játék vége, pontszám:', state.score);
  alert(`Game Over! Elért pontszám: ${state.score}`);
  window.location.reload();
}
