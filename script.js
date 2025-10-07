const moleButtons = document.querySelectorAll('.mole-btn');
const scoreDisplay = document.getElementById('score-value');
const restartBtn = document.getElementById('restart');
let score = 0;

function activateRandomMole() {
  moleButtons.forEach(btn => btn.classList.remove('active'));
  const index = Math.floor(Math.random() * moleButtons.length);
  moleButtons[index].classList.add('active');
}

// Click or keyboard (Enter/Space) activates mole
moleButtons.forEach(btn => {
  btn.addEventListener('click', function() {
    if (btn.classList.contains('active')) {
      score++;
      scoreDisplay.textContent = score;
      activateRandomMole();
    }
  });
  btn.addEventListener('keyup', function(e) {
    if ((e.key === 'Enter' || e.key === ' ') && btn.classList.contains('active')) {
      score++;
      scoreDisplay.textContent = score;
      activateRandomMole();
    }
  });
});

// Restart button
restartBtn.addEventListener('click', function() {
  score = 0;
  scoreDisplay.textContent = score;
  activateRandomMole();
});

activateRandomMole();