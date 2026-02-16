import { evolutions, levels } from './evolutions.js';
import { spawnTile, mergeTiles } from './grid.js';

let state;
let selected = null;

document.addEventListener('click', e => {
  const cell = e.target.closest('.cell');
  if (!cell) return;

  const r = Number(cell.dataset.r);
  const c = Number(cell.dataset.c);

  if (!state.grid[r][c]) return;

  if (!selected) {
    selected = { r, c };
    cell.classList.add('selected');
    return;
  }

  if (selected.r === r && selected.c === c) {
    cell.classList.remove('selected');
    selected = null;
    return;
  }

  const merged = mergeTiles(state.grid, selected.r, selected.c, r, c);

  document.querySelectorAll('.cell.selected').forEach(el => el.classList.remove('selected'));
  selected = null;

  if (merged) {
    state.score += levels[state.difficulty].points;
    spawnTile(state.grid);
  }

  updateUI(state);
});


export function renderGrid() {
  const gridEl = document.getElementById('grid');
  gridEl.style.setProperty('--cols', state.cols);
  gridEl.innerHTML = '';

  state.grid.forEach((row, r) => {
    row.forEach((cell, c) => {
      const div = document.createElement('div');
      div.className = 'cell';
      div.dataset.r = r;
      div.dataset.c = c;

      if (cell) {
        const t = document.createElement('div');
        t.className = 'tile';
        t.dataset.level = cell.level;

        const evo = evolutions
          .flatMap(e => e.steps)
          .find(s => s.step === cell.level);

        if (evo) {
          const img = document.createElement('img');
          img.src = `assets/${evo.img}`;
          img.alt = evo.name;
          img.className = 'tile-img';

          const label = document.createElement('div');
          label.className = 'tile-label';
          label.textContent = evo.name;

          t.append(img, label);
        } else {
          t.textContent = cell.level;
        }

        div.append(t);
      }

      gridEl.append(div);
    });
  });
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
}


function renderLeaderboard() {
  const lb = document.getElementById('leaderboard');
  lb.innerHTML = '<h2>Ranglista</h2>';
}
