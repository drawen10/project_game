import { evolutions, levels } from './evolutions.js';
import { spawnTile, mergeTiles } from './grid.js';

let state;

export function renderGrid() {
  const gridEl = document.getElementById('grid');
  gridEl.style.setProperty('--cols', state.cols);
  gridEl.innerHTML = '';
  state.grid.forEach((row, r) => row.forEach((cell, c) => {
    const div = document.createElement('div');
    div.className = 'cell'; div.dataset.r = r; div.dataset.c = c;
    if (cell) {
      const t = document.createElement('div');
      t.className = 'tile'; t.textContent = cell.level;
      div.append(t);
    }
    gridEl.append(div);
  }));
}

export function updateUI(newState) {
  state = newState;
  document.getElementById('player-display').textContent = state.name;
  document.getElementById('difficulty-display').textContent = levels[state.difficulty].name;
  document.getElementById('timer').textContent = `${state.timeLeft}s`;
  document.getElementById('score').textContent = state.score;
  renderGrid();
  renderScoreboard();
  renderLeaderboard();
}

function renderScoreboard() {
  const sb = document.getElementById('scoreboard');
  sb.innerHTML = '<h2>Pontok</h2>';
  // itt listázod a láncokat és állapotaikat…
}

function renderLeaderboard() {
  const lb = document.getElementById('leaderboard');
  lb.innerHTML = '<h2>Ranglista</h2>';
  // localStorage-ból betöltött top5
}