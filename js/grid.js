export function createGrid(cols, rows) {
    return Array.from({ length: rows }, () => Array(cols).fill(null));
  }
  
  export function spawnTile(grid) {
    const empty = [];
    grid.forEach((row, r) => row.forEach((cell, c) => { if (!cell) empty.push({r,c}); }));
    if (!empty.length) return;
    const { r, c } = empty[Math.floor(Math.random()*empty.length)];
    grid[r][c] = { level: 1 };
  }
  
  export function mergeTiles(grid, r1, c1, r2, c2) {
    const a = grid[r1][c1], b = grid[r2][c2];
    if (!a || !b || a.level !== b.level) return false;
    grid[r1][c1] = { level: a.level + 1 };
    grid[r2][c2] = null;
    return true;
  }