// Theme Toggle and Battleship Game Logic
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const body = document.body;
    const message = document.getElementById('message');
    const newGame = document.getElementById('newGame');

    function setupUI() {
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
    }

    setupUI();

    const board = document.getElementById('board');

    const gridSize = 6;
    let ships = [];
    let guesses = 0;
    let gameOver = false;
    const hitSound = new Audio('./assets/sounds/hit.wav');
    const missSound = new Audio('./assets/sounds/miss.wav');

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

    function handleFire(index, cell) {
        if (gameOver) return;
        guesses++;
        let hitShip = null;

        for (let ship of ships) {
            if (ship.positions.includes(index)) {
                ship.hits.push(index);
                hitShip = ship;
                break;
            }
        }

        if (hitShip) {
            cell.classList.add('correct');
            cell.textContent = '💥';
            hitSound.play();

            if (hitShip.hits.length === hitShip.positions.length) {
                message.textContent = '🔥 You sunk a ship!';
            } else {
                message.textContent = '💢 Hit!';
            }

        } else {
            cell.classList.add('absent');
            cell.textContent = '🌊';
            missSound.play();
            message.textContent = 'Miss!';
        }

        cell.style.pointerEvents = 'none';

        const allSunk = ships.every(s => s.hits.length === s.positions.length);
        if (allSunk) {
            gameOver = true;
            message.textContent = '🎯 All ships sunk! You win!';
            revealRemaining();
        } else if (guesses >= 20) {
            gameOver = true;
            message.textContent = '💀 Game over. Out of guesses.';
            revealRemaining();
        }
    }

    function revealRemaining() {
        const cells = document.querySelectorAll('.square');
        for (let ship of ships) {
            for (let pos of ship.positions) {
                const cell = cells[pos];
                if (!cell.classList.contains('correct')) {
                    cell.classList.add('correct');
                    cell.textContent = '🚢';
                }
            }
        }
    }

    async function placeShips() {
        ships = [];
        try {
            const response = await fetch('./assets/battleship.json');
            const data = await response.json();

            data.ships.forEach(ship => {
                const { name, orientation, size, coords } = ship;
                const positions = [];

                let [col, row] = coords.map(x => x - 1); // convert to 0-based

                for (let i = 0; i < size; i++) {
                    const index = orientation === 'horizontal'
                        ? row * gridSize + (col + i)
                        : (row + i) * gridSize + col;

                    positions.push(index);
                }

                ships.push({ name, positions, hits: [] });
            });

        } catch (error) {
            console.error('Failed to load ship data:', error);
        }
    }

    async function resetGame() {
        guesses = 0;
        gameOver = false;
        ships = [];
        createBoard();
        await placeShips();
        message.textContent = '';
    }

    newGame.addEventListener('click', resetGame);
    resetGame();
});
