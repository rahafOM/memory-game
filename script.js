const themes = {
  computer: [
    'image/cpp-logo_2x.png',
    'image/head-with-brain-illustration-design-human-head-and-brain-icon-mind-concept-free-vector.jpg',
    'image/leetcode-social-preview.png',
    'image/python-programming-language.webp',
    'image/labtob.jpg',
    'image/java.webp'
  ],
  electrical: [
    'image/transtor.webp',
    'image/slk.png',
    'image/mag.png',
    'image/pngtree-lamp-bulb-icon-cartoon-style-png-image_1857458.jpg',
    'image/EE.png',
    'image/battary.png'
  ],
  mechanical: [
    'image/1f527.png',
    'image/borge.avif',
    'image/ME.png',
    'image/تنزيل.png',
    'image/images (1).png',
    'image/images.png'
  ]
};
const selectSound = new Audio('Hl4kjBxvWcY.mp3'); 
document.querySelectorAll('[data-theme]').forEach(btn => {
  btn.addEventListener('click', () => {
    const theme = btn.dataset.theme;
    selectSound.play(); 
    startGame(themes[theme]);
  });
});


const gameBoard = document.querySelector('.board');
let flippedCards = [];
let lockBoard = false;

document.querySelectorAll('[data-theme]').forEach(btn => {
  btn.addEventListener('click', () => {
    const theme = btn.dataset.theme;
    startGame(themes[theme]);
  });
});

function startGame(image) {
  gameBoard.innerHTML = '';
  const cards = shuffle([...image, ...image]); 
  flippedCards = [];

  cards.forEach(imgSrc => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.image = imgSrc;

    const back = document.createElement('div');
    back.classList.add('back');
    card.appendChild(back);

    const front = document.createElement('img');
    front.src = imgSrc;
    front.classList.add('front');
    card.appendChild(front);

    card.addEventListener('click', flipCard);
    gameBoard.appendChild(card);
  });
}

function flipCard() {
  if (lockBoard || this.classList.contains('flipped')) return;

  this.classList.add('flipped');
  flippedCards.push(this);

  if (flippedCards.length === 2) {
    checkMatch();
  }
}

function checkMatch() {
  const [card1, card2] = flippedCards;
  if (card1.dataset.image === card2.dataset.image) {
    card1.classList.add('matched');
    card2.classList.add('matched');
    flippedCards = [];
    checkWin();
  } else {
    lockBoard = true;
    setTimeout(() => {
      [card1, card2].forEach(card => {
        card.classList.remove('flipped');
      });
      flippedCards = [];
      lockBoard = false;
    }, 1000);
  }
}
  function checkWin() {
  const allCards = document.querySelectorAll('.card');
  const matchedCards = document.querySelectorAll('.card.matched');

  if (allCards.length === matchedCards.length) {
      const winSound = new Audio('mixkit-melodic-bonus-collect-1938.wav'); 
      winSound.play();
    launchConfetti(); 
  }
}
function launchConfetti() {
  for (let i = 0; i < 30; i++) {
    const confetti = document.createElement('div');
    confetti.classList.add('confetti');
    confetti.style.left = `${Math.random() * 100}%`;
    confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 70%, 60%)`;
    document.body.appendChild(confetti);

    setTimeout(() => confetti.remove(), 1500);
  }
}


function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}
