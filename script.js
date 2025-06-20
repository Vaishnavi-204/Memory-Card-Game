const cardSets = {
    animals: [
        "Animals/fox.jpg",
        "Animals/bear.jpg",
        "Animals/elephant.jpg",
        "Animals/camel.jpg",
        "Animals/goat.jpg",
        "Animals/donkey.jpg",
        "Animals/cow.jpg",
        "Animals/jiraff.jpg",
        "Animals/gorila.jpg",
        "Animals/panda.jpg",
        "Animals/rabbit.jpg",
        "Animals/squirrel.jpg",
        "Animals/monkey.jpg",
        "Animals/tiger.jpg",
        "Animals/pig.jpg",
        "Animals/lion.jpg"
    ],
    fruits: [
        "Fruits/apple.jpg",
        "Fruits/pineapple.jpg",
        "Fruits/cavy.jpg",
        "Fruits/banana.jpg",
        "Fruits/cherry.jpg",
        "Fruits/grapes.jpg",
        "Fruits/jamun.jpg",
        "Fruits/pomegranate.jpg",
        "Fruits/watermelon.jpg",
        "Fruits/strawberry.jpg",
        "Fruits/guava.jpg",
        "Fruits/orange.jpg",
        "Fruits/papaya.jpg",
        "Fruits/coconut.jpg",
        "Fruits/dragon.jpg",
        "Fruits/lemon.jpg"
    ],

    flags: [
        "emojis/2.png",
        "emojis/1.png",
        "emojis/3.png",
        "emojis/4.png",
        "emojis/5.png",
        "emojis/6.png",
        "emojis/7.png",
        "emojis/8.png",
        "emojis/9.png",
        "emojis/10.png",
        "emojis/11.png",
        "emojis/12.png",
        "emojis/13.png",
        "emojis/14.png",
        "emojis/15.png",
        "emojis/16.png"
    ]
};


let selectedCardType = 'animals';
let pairsToMatch = 8;
let cards = [];
let flippedCards = [];
let matchedPairs = 0;
let moves = 0;
let timer = null;
let seconds = 0;
let gameStarted = false;


const homeScreen = document.getElementById('home-screen');
const gameScreen = document.getElementById('game-screen');
const winScreen = document.getElementById('win-screen');
const gameBoard = document.getElementById('game-board');
const movesDisplay = document.getElementById('moves');
const matchesDisplay = document.getElementById('matches');
const totalPairsDisplay = document.getElementById('total-pairs');
const timeDisplay = document.getElementById('time');
const finalMovesDisplay = document.getElementById('final-moves');
const finalTimeDisplay = document.getElementById('final-time');
const startBtn = document.getElementById('start-btn');
const backBtn = document.getElementById('back-btn');
const playAgainBtn = document.getElementById('play-again-btn');
const newGameBtn = document.getElementById('new-game-btn');


document.querySelectorAll('.card-option').forEach(option => {
    option.addEventListener('click', () => {
        document.querySelectorAll('.card-option').forEach(opt => {
            opt.classList.remove('selected');
        });
        option.classList.add('selected');
        selectedCardType = option.getAttribute('data-type');
    });
});


document.querySelectorAll('.level-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.level-btn').forEach(b => {
            b.classList.remove('selected');
        });
        btn.classList.add('selected');
        pairsToMatch = parseInt(btn.getAttribute('data-pairs'));
    });
});


startBtn.addEventListener('click', startGame);


backBtn.addEventListener('click', backToHome);


playAgainBtn.addEventListener('click', () => {
    winScreen.classList.add('hidden');
    startGame();
});


newGameBtn.addEventListener('click', () => {
    winScreen.classList.add('hidden');
    homeScreen.classList.remove('hidden');
});


function startGame() {

    const selectedCards = cardSets[selectedCardType].slice(0, pairsToMatch);

    
    const cardPairs = [...selectedCards, ...selectedCards];

    
    cards = shuffleArray(cardPairs);

    
    flippedCards = [];
    matchedPairs = 0;
    moves = 0;
    seconds = 0;
    gameStarted = true;

    
    movesDisplay.textContent = moves;
    matchesDisplay.textContent = matchedPairs;
    totalPairsDisplay.textContent = pairsToMatch;
    timeDisplay.textContent = '00:00';

    
    homeScreen.classList.add('hidden');
    gameScreen.classList.remove('hidden');

    renderGameBoard();

   
    if (timer) clearInterval(timer);
    timer = setInterval(updateTimer, 1000);
}


function renderGameBoard() {
    gameBoard.innerHTML = '';

    
    let columns;
    if (pairsToMatch <= 8) columns = 4;
    else if (pairsToMatch <= 8) columns = 4;
    else columns = 6;


    gameBoard.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;

    
    cards.forEach((cardImage, index) => {
        const cardElement = document.createElement('div');
        cardElement.className = 'card';
        cardElement.dataset.index = index;

        const cardFront = document.createElement('div');
        cardFront.className = 'card-face card-front';
        cardFront.style.backgroundImage = `url(${cardImage})`;

        const cardBack = document.createElement('div');
        cardBack.className = 'card-face card-back';

        cardElement.appendChild(cardFront);
        cardElement.appendChild(cardBack);
        cardElement.addEventListener('click', () => flipCard(index));

        gameBoard.appendChild(cardElement);
    });
}


function flipCard(index) {
    if (!gameStarted || flippedCards.length >= 2 || flippedCards.includes(index) || cards[index] === null) {
        return;
    }

    const cardElement = document.querySelector(`.card[data-index="${index}"]`);
    cardElement.classList.add('flipped');
    flippedCards.push(index);

    if (flippedCards.length === 2) {
        moves++;
        movesDisplay.textContent = moves;

        const [firstIndex, secondIndex] = flippedCards;

        if (cards[firstIndex] === cards[secondIndex]) {

            matchedPairs++;
            matchesDisplay.textContent = matchedPairs;

            setTimeout(() => {
                document.querySelector(`.card[data-index="${firstIndex}"]`).classList.add('matched');
                document.querySelector(`.card[data-index="${secondIndex}"]`).classList.add('matched');
                cards[firstIndex] = null;
                cards[secondIndex] = null;
                flippedCards = [];

                // Check for win
                if (matchedPairs === pairsToMatch) {
                    clearInterval(timer);
                    setTimeout(showWinScreen, 500);
                }
            }, 500);
        } else {

            setTimeout(() => {
                document.querySelector(`.card[data-index="${firstIndex}"]`).classList.remove('flipped');
                document.querySelector(`.card[data-index="${secondIndex}"]`).classList.remove('flipped');
                flippedCards = [];
            }, 1000);
        }
    }
}


function showWinScreen() {
    gameScreen.classList.add('hidden');
    winScreen.classList.remove('hidden');
    finalMovesDisplay.textContent = moves;
    finalTimeDisplay.textContent = formatTime(seconds);
}


function backToHome() {
    gameScreen.classList.add('hidden');
    homeScreen.classList.remove('hidden');
    clearInterval(timer);
    gameStarted = false;
}


function updateTimer() {
    seconds++;
    timeDisplay.textContent = formatTime(seconds);
}


function formatTime(totalSeconds) {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}


function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}


function preloadImages() {
    const allImages = [];
    for (const set in cardSets) {
        allImages.push(...cardSets[set]);
    }

    allImages.forEach(imgUrl => {
        new Image().src = imgUrl;
    });
}


preloadImages();
document.querySelector('.card-option').classList.add('selected');
document.querySelector('.level-btn[data-pairs="8"]').classList.add('selected');

