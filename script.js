const board = document.getElementById('sudoku-board');
const result = document.getElementById('result');
const sizeSelect = document.getElementById('gridSize');
const difficultySelect = document.getElementById('difficulty');

let gridSize = 9;
let puzzle = [];

function generatePuzzle(size, difficulty) {
  const emptyRate = {
    easy: 0.3,
    medium: 0.5,
    hard: 0.7
  }[difficulty];

  const grid = Array(size).fill().map(() => Array(size).fill(''));
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      const shouldFill = Math.random() > emptyRate;
      if (shouldFill) {
        grid[i][j] = ((i * size + j + 1) % size) + 1; // very simple generator
      }
    }
  }
  return grid;
}

function createBoard() {
  board.innerHTML = '';
  board.style.gridTemplateColumns = `repeat(${gridSize}, 40px)`;
  puzzle.forEach((row, i) => {
    row.forEach((cell, j) => {
      const input = document.createElement('input');
      input.maxLength = 2;
      input.style.width = '40px';
      input.style.height = '40px';
      input.dataset.row = i;
      input.dataset.col = j;
      if (cell !== '') {
        input.value = cell;
        input.disabled = true;
        input.classList.add('prefilled');
      }
      board.appendChild(input);
    });
  });
}

function checkSolution() {
  const inputs = Array.from(board.children);
  const grid = Array(gridSize).fill().map(() => Array(gridSize).fill(''));
  inputs.forEach((input, i) => {
    const row = Math.floor(i / gridSize);
    const col = i % gridSize;
    grid[row][col] = input.value;
  });

  let valid = true;
  for (let i = 0; i < gridSize; i++) {
    const rowSet = new Set();
    const colSet = new Set();
    for (let j = 0; j < gridSize; j++) {
      rowSet.add(grid[i][j]);
      colSet.add(grid[j][i]);
    }
    if (rowSet.size !== gridSize || colSet.size !== gridSize) {
      valid = false;
      break;
    }
  }

  result.textContent = valid ? '✅ Correct!' : '❌ Try again.';
}

function startGame() {
  gridSize = parseInt(sizeSelect.value);
  const difficulty = difficultySelect.value;
  puzzle = generatePuzzle(gridSize, difficulty);
  createBoard();
}

startGame();
