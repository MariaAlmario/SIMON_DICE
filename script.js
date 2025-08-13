const colors = ["green", "red", "yellow", "blue", "pink", "orange", "brown", "purple", "aguamarina"];
let gameSequence = [];
let playerSequence = [];
let level = 0;
let gameStarted = false;

const startButton = document.getElementById('start-btn');
const message = document.getElementById('message');
const buttons = document.querySelectorAll('.button');

// Iniciar el juego
startButton.addEventListener('click', () => {
    if (!gameStarted) {
        gameStarted = true;
        message.textContent = `Nivel ${level + 1}`;
        startNewRound();
    }
});

// Función para iniciar una nueva ronda
function startNewRound() {
    playerSequence = [];
    level++;
    message.textContent = `Nivel ${level}`;
    gameSequence.push(randomColor());
    displaySequence();
}

// Generar un color aleatorio
function randomColor() {
    return colors[Math.floor(Math.random() * colors.length)];
}

// Mostrar la secuencia del juego
function displaySequence() {
    let i = 0;
    const interval = setInterval(() => {
        lightUpButton(gameSequence[i]);
        i++;
        if (i === gameSequence.length) {
            clearInterval(interval);
        }
    }, 1000);
}

// Iluminar un botón (mostrar activación)
function lightUpButton(color) {
    const button = document.getElementById(color);
    button.classList.add("active");

    setTimeout(() => {
        button.classList.remove("active");
    }, 500);
}

// Escuchar los clics de los botones
buttons.forEach(button => {
    button.addEventListener('click', (event) => {
        if (gameStarted) {
            const clickedColor = event.target.id;
            playerSequence.push(clickedColor);
            lightUpButton(clickedColor);
            checkPlayerSequence();
        }
    });
});

// Verificar si la secuencia del jugador es correcta
function checkPlayerSequence() {
    const currentIndex = playerSequence.length - 1;
    if (playerSequence[currentIndex] !== gameSequence[currentIndex]) {
        gameOver();
        return;
    }

    if (playerSequence.length === gameSequence.length) {
        setTimeout(() => {
            startNewRound();
        }, 1);
    }
}

// Fin del juego
function gameOver() {
    message.textContent = `¡Perdiste! El nivel alcanzado fue: ${level}`;
    gameStarted = false;
    gameSequence = [];
    level = 0;
}