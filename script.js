const moles = document.querySelectorAll('.mole');
const scoreBox = document.getElementById('score');
const restartBtn = document.getElementById('restart');

let score = 0;
let activeMole = -1;

// Randomly highlight a mole every 1s
function activateRandomMole() {
    moles.forEach(btn => btn.classList.remove('active'));
    activeMole = Math.floor(Math.random() * moles.length);
    moles[activeMole].classList.add('active');
}

function handleMoleClick(e) {
    if (e.target.classList.contains('active')) {
        score++;
        scoreBox.textContent = `Score: ${score}`;
        activateRandomMole();
    }
}

moles.forEach(mole => mole.addEventListener('click', handleMoleClick));

// Start game
activateRandomMole();
let moleInterval = setInterval(activateRandomMole, 1000);

// Restart logic
restartBtn.addEventListener('click', () => {
    score = 0;
    scoreBox.textContent = `Score: 0`;
    activateRandomMole();
});
