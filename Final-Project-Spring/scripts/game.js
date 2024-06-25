const holes = document.querySelectorAll('.hole');
const scoreBoard = document.getElementById('score');
const highScoreBoard = document.getElementById('highScore');
const timeBoard = document.getElementById('time');
const startButton = document.getElementById('startButton');
const restartButton = document.getElementById('restartButton');
const whackSound = document.getElementById('whackSound');
const bgm = document.getElementById('bgm');
const difficulty = document.getElementById('difficulty');
let lastHole;
let timeUp = false;
let score = 0;
let highScore = localStorage.getItem('highScore') || 0;
let countdown;
highScoreBoard.textContent = highScore;

function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function randomHole(holes) {
    const idx = Math.floor(Math.random() * holes.length);
    const hole = holes[idx];
    if (hole === lastHole) {
        return randomHole(holes);
    }
    lastHole = hole;
    return hole;
}

function peep() {
    const time = randomTime(500, parseInt(difficulty.value));
    const hole = randomHole(holes);
    hole.classList.add('active');
    setTimeout(() => {
        hole.classList.remove('active');
        if (!timeUp) peep();
    }, time);
}

function startGame() {
    scoreBoard.textContent = 0;
    highScoreBoard.textContent = highScore;
    score = 0;
    timeUp = false;
    startButton.style.display = 'none';
    restartButton.style.display = 'block';
    bgm.play();
    peep();
    let time = 20;
    countdown = setInterval(() => {
        timeBoard.textContent = --time;
        if (time === 0) {
            clearInterval(countdown);
            timeUp = true;
            bgm.pause();
            if (score > highScore) {
                highScore = score;
                localStorage.setItem('highScore', highScore);
                highScoreBoard.textContent = highScore;
            }
            restartButton.textContent = 'Restart Game';
        }
    }, 1000);
}

function restartGame() {
    clearInterval(countdown);
    timeUp = true;
    startButton.style.display = 'block';
    restartButton.style.display = 'none';
    scoreBoard.textContent = 0;
    score = 0;
    holes.forEach(hole => hole.classList.remove('active'));
    timeBoard.textContent = 20;
}

function bonk(e) {
    if (!e.isTrusted || !e.target.classList.contains('mole')) return;
    score++;
    e.target.parentNode.classList.remove('active');
    scoreBoard.textContent = score;
    whackSound.currentTime = 0;
    whackSound.play();
}

holes.forEach(hole => hole.addEventListener('click', bonk));
startButton.addEventListener('click', startGame);
restartButton.addEventListener('click', restartGame);
