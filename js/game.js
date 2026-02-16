import { levels } from './evolutions.js';
import { createGrid, spawnTile } from './grid.js';
import { updateUI } from './ui.js';
import { initTooltip } from './tooltip.js';

export function initGame({ name, difficulty }) {
  console.log('🚀 initGame invited', { name, difficulty });
  const lvl = levels[difficulty];
  const state = {
    name,
    difficulty,
    cols: lvl.cols,
    rows: lvl.rows,
    timeLeft: lvl.time,
    score: 0,
    grid: createGrid(lvl.cols, lvl.rows)
  };

  for (let i = 0; i < lvl.cols; i++) {
    spawnTile(state.grid);
  }

  updateUI(state);
  initTooltip();

  console.log('🔧 Game state initialized', state);

  const timerId = setInterval(() => {
    state.timeLeft--;
    if (state.timeLeft <= 0) {
      clearInterval(timerId);
      console.log('⏰ Time out, game over');
      endGame(state);
    }
    updateUI(state);
  }, 1000);
}

function endGame(state) {
  console.log('🏁 Game over, Score:', state.score);
  alert(`Game Over! Score: ${state.score}`);
  window.location.reload();
}
