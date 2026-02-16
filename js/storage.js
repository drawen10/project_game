const KEY = 'webprog_evolutions_leaderboard';

export function loadLeaderboard() {
  return JSON.parse(localStorage.getItem(KEY) || '{}');
}

export function saveScore(difficulty, score) {
  const lb = loadLeaderboard();
  lb[difficulty] = lb[difficulty] || [];
  lb[difficulty].push(score);
  lb[difficulty].sort((a,b) => b - a);
  lb[difficulty] = lb[difficulty].slice(0,5);
  localStorage.setItem(KEY, JSON.stringify(lb));
}