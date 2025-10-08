const moleButtons = document.querySelectorAll('.mole-btn');
const scoreDisplay = document.getElementById('score-value');
const restartBtn = document.getElementById('restart');
const winMsg = document.getElementById('win-message');
const msgBar = document.getElementById('msg-bar');
let score = 0;
let gameWon = false;
let moleInterval = null;

// Smooth pop/active transition
function activateRandomMole() {
  moleButtons.forEach(btn => btn.classList.remove('active'));
  if (gameWon) return;
  const index = Math.floor(Math.random() * moleButtons.length);
  moleButtons[index].classList.add('active');
}

function startGame() {
  score = 0;
  gameWon = false;
  scoreDisplay.textContent = score;
  winMsg.style.display = 'none';
  showMessage('Ready... Whack the green mole!');
  moleButtons.forEach(btn => btn.removeAttribute('disabled'));
  activateRandomMole();
  if (moleInterval) clearInterval(moleInterval);
  moleInterval = setInterval(activateRandomMole, 1000);
}

function endGame() {
  gameWon = true;
  clearInterval(moleInterval);
  winMsg.style.display = 'flex';
  moleButtons.forEach(btn => btn.setAttribute('disabled', 'true'));
  showMessage('You win! 🎉 Game Over.');
}

function showMessage(msg) {
  msgBar.style.display = 'block';
  msgBar.textContent = msg;
  setTimeout(() => {
    msgBar.style.display = 'none';
  }, 1550);
}

moleButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    if (btn.classList.contains('active') && !gameWon) {
      score++;
      scoreDisplay.textContent = score;
      showMessage(`+1 Point!`);
      if (score >= 5) {
        endGame();
      } else {
        activateRandomMole();
      }
    } else if (!gameWon) {
      showMessage('Only whack the green mole!');
    }
  });
  btn.addEventListener('keyup', (e) => {
    if ((e.key === "Enter" || e.key === " ") && btn.classList.contains('active') && !gameWon) {
      score++;
      scoreDisplay.textContent = score;
      showMessage(`+1 Point!`);
      if (score >= 5) {
        endGame();
      } else {
        activateRandomMole();
      }
    } else if ((e.key === "Enter" || e.key === " ") && !gameWon) {
      showMessage('Only whack the green mole!');
    }
  });
});

restartBtn.addEventListener('click', () => {
  startGame();
});

// Defensive clear
window.addEventListener('unload', () => {
  if (moleInterval) clearInterval(moleInterval);
});

startGame();