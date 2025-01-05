const cells = document.querySelectorAll('[data-cell]');
const messageEl = document.querySelector('.message');
const winnerText = document.querySelector('.winner-text');
const restartBtn = document.getElementById('restart');
let isXTurn = true;

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function checkWinner() {
  const board = Array.from(cells).map(cell => cell.textContent);
  for (let combo of winningCombinations) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return board.includes('') ? null : 'Draw';
}

function handleClick(e) {
  const cell = e.target;
  const currentPlayer = isXTurn ? 'X' : 'O';
  cell.textContent = currentPlayer;
  cell.classList.add('taken');

  const result = checkWinner();
  if (result) {
    endGame(result);
  } else {
    isXTurn = !isXTurn;
  }
}

function endGame(result) {
  winnerText.textContent = result === 'Draw' ? 'It\'s a Draw!' : `${result} Wins!`;
  messageEl.classList.add('active');
  cells.forEach(cell => cell.removeEventListener('click', handleClick));
}

function restartGame() {
  isXTurn = true;
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('taken');
    cell.addEventListener('click', handleClick, { once: true });
  });
  messageEl.classList.remove('active');
}

cells.forEach(cell => cell.addEventListener('click', handleClick, { once: true }));
restartBtn.addEventListener('click', restartGame);