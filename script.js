const moleButtons = document.querySelectorAll('.mole-btn');
const scoreDisplay = document.getElementById('score-value');
const restartBtn = document.getElementById('restart');
let score = 0;

// Pick a random mole and show the "active" (green) class
function activateRandomMole() {
    moleButtons.forEach(btn => btn.classList.remove('active'));
    const randomIndex = Math.floor(Math.random() * moleButtons.length);
    moleButtons[randomIndex].classList.add('active');
}

// When clicked, score increases only if 'active'
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

// Restart resets score and a new random mole
restartBtn.addEventListener('click', function() {
    score = 0;
    scoreDisplay.textContent = score;
    activateRandomMole();
});

// Initial activation
activateRandomMole();