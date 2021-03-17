/* eslint-disable linebreak-style */
const container = document.querySelector('#container');
const reset = document.querySelector('#reset');

function buildGrid(size) {
  const gridSize = size;
  const relSize = `${(1 / gridSize) * 100}%`;
  for (let i = 0; i < gridSize; i += 1) {
    const newRow = document.createElement('div');
    newRow.style.height = relSize;
    newRow.className = 'row';
    for (let j = 0; j < gridSize; j += 1) {
      const newPix = document.createElement('div');
      newPix.id = `${i}_${j}`;
      newPix.className = 'pixel';
      newPix.style.width = relSize;
      newPix.style.height = '100%';
      newRow.appendChild(newPix);
    }
    container.appendChild(newRow);
  }
}

function getGridSize() {
  let userSize = NaN;
  do {
    userSize = prompt('Enter Grid size 1-100', 16);
  } while (!parseInt(userSize, 10) || parseInt(userSize, 10) < 0 || parseInt(userSize, 10) > 100);
  buildGrid(userSize);
}

function resetColor() {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
  getGridSize();
}

getGridSize();

container.addEventListener('mouseover', (e) => {
  if (e.target.className === 'pixel') {
    e.target.style.background = 'black';
  }
});

reset.addEventListener('click', resetColor);
