export function initTooltip() {
    let timeout;
    document.getElementById('grid').addEventListener('mouseover', e => {
      const cell = e.target.closest('.cell');
      if (!cell || !cell.querySelector('.tile')) return;
      timeout = setTimeout(() => showTooltip(cell), 3000);
    });
    document.getElementById('grid').addEventListener('mouseout', e => {
      clearTimeout(timeout);
      hideTooltip();
    });
  }
  
  function showTooltip(cell) {
    const lvl = cell.querySelector('.tile').textContent;
  }
  
  function hideTooltip() {
    const tip = document.querySelector('.tooltip');
    if (tip) tip.remove();
  }