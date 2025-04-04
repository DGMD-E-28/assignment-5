// Theme Toggle and Battleship Game Logic
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const body = document.body;
    const message = document.getElementById('message');
    const debugCheckbox = document.getElementById('debug-toggle');
    const debugIcon = document.getElementById('debug-icon');
    const debugShipDisplay = document.createElement('div');
    debugShipDisplay.style.fontSize = '14px';
    debugShipDisplay.style.textAlign = 'center';
    debugShipDisplay.style.color = 'var(--text-color)';
    debugShipDisplay.style.marginTop = '5px';
    debugIcon.parentElement.appendChild(debugShipDisplay);

    themeToggle.addEventListener('input', () => {
        let themeState = parseInt(themeToggle.value, 10);

        if (themeState === 0) {
            body.classList.remove('dark-mode', 'navy-mode');
            themeIcon.innerHTML = '🌞';
        } else if (themeState === 1) {
            body.classList.add('dark-mode');
            body.classList.remove('navy-mode');
            themeIcon.innerHTML = '🌙';
        } else {
            body.classList.add('navy-mode');
            body.classList.remove('dark-mode');
            themeIcon.innerHTML = `<img src="./assets/navy.png" alt="Navy" class="navy-icon">`;
        }
    });

    const board = document.getElementById('board');
    const newGame = document.getElementById('newGame');

    const gridSize = 10;
    let ships = [];
    let hits = 0;
    const hitSound = new Audio('./assets/sounds/hit.wav');
    const missSound = new Audio('./assets/sounds/miss.wav');
    let debugMode = false;

    debugCheckbox.addEventListener('change', () => {
        debugMode = debugCheckbox.checked;
        if (debugMode) {
            debugShipDisplay.innerHTML = `<strong>Ship Indices: ${ships.join(', ')}</strong>`;
        } else {
            debugShipDisplay.innerHTML = '';
        }
    });

    function createBoard() {
        board.innerHTML = '';
        board.style.display = 'grid';
        board.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
        board.style.gap = '2px';

        for (let i = 0; i < gridSize * gridSize; i++) {
            const cell = document.createElement('div');
            cell.classList.add('square');
            cell.dataset.index = i;
            cell.addEventListener('click', () => handleFire(i, cell));
            board.appendChild(cell);
        }
    }

    function placeShips() {
        ships = [];
        while (ships.length < 10) {
            const pos = Math.floor(Math.random() * gridSize * gridSize);
            if (!ships.includes(pos)) {
                ships.push(pos);
            }
        }

        if (debugMode) {
            debugShipDisplay.innerHTML = `<strong>Ship Indices: ${ships.join(', ')}</strong>`;
        }
    }

    function handleFire(index, cell) {
        if (ships.includes(index)) {
            cell.classList.add('correct');
            cell.textContent = '💥';
            hitSound.play();
            hits++;
            if (hits === ships.length) {
                message.textContent = '🎯 All ships sunk! You win!';
            }
        } else {
            cell.classList.add('absent');
            cell.textContent = '🌊';
            missSound.play();
        }
        cell.style.pointerEvents = 'none';
    }

    function resetGame() {
        hits = 0;
        createBoard();
        placeShips();
        message.textContent = '';
    }

    newGame.addEventListener('click', resetGame);
    resetGame();
});
