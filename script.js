const moleButtons = document.querySelectorAll('.mole-btn');
const scoreDisplay = document.getElementById('score-value');
const restartBtn = document.getElementById('restart');
const winMsg = document.getElementById('win-message');
let score = 0;
let gameWon = false;
let moleInterval = null;

// Highlight a mole randomly every second
function activateRandomMole() {
  moleButtons.forEach(btn => btn.classList.remove('active'));
  if (gameWon) return;
  const index = Math.floor(Math.random() * moleButtons.length);
  moleButtons[index].classList.add('active');
}

// Start/restart the game
function startGame() {
  score = 0;
  gameWon = false;
  scoreDisplay.textContent = score;
  winMsg.style.display = 'none';
  moleButtons.forEach(btn => btn.removeAttribute('disabled'));
  activateRandomMole();
  if (moleInterval) clearInterval(moleInterval);
  moleInterval = setInterval(activateRandomMole, 1000);
}

// Show win message and end game
function endGame() {
  gameWon = true;
  clearInterval(moleInterval);
  winMsg.style.display = 'flex';
  moleButtons.forEach(btn => btn.setAttribute('disabled', 'true'));
}

// Click or keyboard (Enter/Space) increases score if mole is active
moleButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    if (btn.classList.contains('active') && !gameWon) {
      score++;
      scoreDisplay.textContent = score;
      if (score >= 5) {
        endGame();
      } else {
        activateRandomMole();
      }
    }
  });
  btn.addEventListener('keyup', (e) => {
    if ((e.key === "Enter" || e.key === " ") && btn.classList.contains('active') && !gameWon) {
      score++;
      scoreDisplay.textContent = score;
      if (score >= 5) {
        endGame();
      } else {
        activateRandomMole();
      }
    }
  });
});

restartBtn.addEventListener('click', startGame);

// Start game on load
startGame();