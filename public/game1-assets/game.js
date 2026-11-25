const WINNING_FAME = 12;

const cardLibrary = [
  { id: 'gurru', type: 'fame', icon: '🏆', title: 'Golazo', copy: 'Ganás 2 de fama.', fame: 2, copies: 10 },
  { id: 'remontada', type: 'fame', icon: '🚀', title: 'Remontada', copy: 'Ganás 3 de fama si no vas primero. Si vas primero, solo 1.', fame: 3, copies: 8, comeback: true },
  { id: 'chicana', type: 'chicana', icon: '😈', title: 'Chicana', copy: 'Robale 2 de fama a alguien. Un escudo la frena.', steal: 2, copies: 10 },
  { id: 'escudo', type: 'shield', icon: '🛡️', title: 'Escudo anti-bardo', copy: 'Tu próximo robo de fama queda bloqueado.', copies: 8 }
];

const setup = document.querySelector('#setup');
const game = document.querySelector('#game');
const playerFields = document.querySelector('#player-fields');
const countButtons = document.querySelector('#count-buttons');
const scoreboard = document.querySelector('#scoreboard');
const turnTitle = document.querySelector('#turn-title');
const turnHelp = document.querySelector('#turn-help');
const roundLabel = document.querySelector('#round-label');
const passScreen = document.querySelector('#pass-screen');
const playArea = document.querySelector('#play-area');
const hand = document.querySelector('#hand');
const targetPicker = document.querySelector('#target-picker');
const log = document.querySelector('#log');
const rulesCard = document.querySelector('#rules-card');
const winner = document.querySelector('#winner');
const winnerTitle = document.querySelector('#winner-title');
const winnerCopy = document.querySelector('#winner-copy');

let playerCount = 4;
let players = [];
let deck = [];
let currentPlayer = 0;
let turn = 1;
let handVisible = false;
let pendingCard = null;
let history = [];
let gameOver = false;

function shuffle(items) {
  const shuffled = [...items];
  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const swapIndex = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[i]];
  }
  return shuffled;
}

function buildDeck() {
  return shuffle(cardLibrary.flatMap((card) => Array.from({ length: card.copies }, () => ({ ...card }))));
}

function draw(player, amount = 1) {
  for (let i = 0; i < amount && deck.length; i += 1) player.hand.push(deck.pop());
}

function makePlayerFields() {
  playerFields.replaceChildren(...Array.from({ length: playerCount }, (_, index) => {
    const label = document.createElement('label');
    label.className = 'player-field';
    label.textContent = `Jugador ${index + 1}`;
    const input = document.createElement('input');
    input.type = 'text';
    input.maxLength = 16;
    input.value = `Gurru ${index + 1}`;
    input.setAttribute('aria-label', `Nombre del jugador ${index + 1}`);
    label.append(input);
    return label;
  }));
}

function initials(name) {
  return name.trim().slice(0, 1).toUpperCase() || 'G';
}

function addLog(message) {
  history.unshift(message);
  history = history.slice(0, 7);
}

function renderScoreboard() {
  scoreboard.replaceChildren(...players.map((player, index) => {
    const card = document.createElement('article');
    card.className = `player-score${index === currentPlayer && !gameOver ? ' current' : ''}`;
    const name = document.createElement('span');
    name.className = 'name';
    name.textContent = `${initials(player.name)} · ${player.name}`;
    name.title = player.name;
    const score = document.createElement('strong');
    score.className = 'score';
    score.textContent = player.fame;
    const label = document.createElement('span');
    label.className = 'score-label';
    label.textContent = 'FAMA';
    card.append(name, score, label);
    if (player.shield) {
      const shield = document.createElement('span');
      shield.className = 'shield-badge';
      shield.title = 'Escudo listo';
      shield.textContent = '🛡️';
      card.append(shield);
    }
    return card;
  }));
}

function renderLog() {
  log.replaceChildren(...history.map((entry) => {
    const item = document.createElement('li');
    item.textContent = entry;
    return item;
  }));
}

function renderHand() {
  const player = players[currentPlayer];
  hand.replaceChildren(...player.hand.map((card, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = `card ${card.type}`;
    button.setAttribute('aria-label', `${card.title}. ${card.copy}`);
    button.innerHTML = `<span class="card-icon" aria-hidden="true">${card.icon}</span><span class="card-kind">${card.type === 'fame' ? 'Fama' : card.type === 'chicana' ? 'Chicana' : 'Defensa'}</span><strong class="card-title">${card.title}</strong><span class="card-copy">${card.copy}</span>`;
    button.addEventListener('click', () => selectCard(index));
    return button;
  }));
}

function renderTurn() {
  if (gameOver) return;
  const player = players[currentPlayer];
  const round = Math.floor((turn - 1) / players.length) + 1;
  roundLabel.textContent = `Ronda ${round} · ${deck.length} cartas en el mazo`;
  turnTitle.textContent = `Turno de ${player.name}`;
  turnHelp.textContent = handVisible
    ? 'Elegí una carta. Después el dispositivo pasa al siguiente.'
    : `Pasen el dispositivo a ${player.name}.`;
  passScreen.classList.toggle('hidden', handVisible);
  playArea.classList.toggle('hidden', !handVisible);
  if (handVisible) renderHand();
  renderScoreboard();
  renderLog();
}

function isLeading(player) {
  const highest = Math.max(...players.map((entry) => entry.fame));
  return player.fame === highest;
}

function selectCard(index) {
  if (pendingCard || gameOver) return;
  const player = players[currentPlayer];
  const card = player.hand[index];
  if (!card) return;
  player.hand.splice(index, 1);

  if (card.type === 'chicana') {
    pendingCard = card;
    showTargets();
    return;
  }

  resolveCard(card);
}

function showTargets() {
  targetPicker.classList.remove('hidden');
  targetPicker.replaceChildren();
  const question = document.createElement('p');
  question.textContent = '¿A quién le cae la chicana?';
  const buttons = document.createElement('div');
  buttons.className = 'target-buttons';
  players.forEach((player, index) => {
    if (index === currentPlayer) return;
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = player.name;
    button.addEventListener('click', () => resolveChicana(index));
    buttons.append(button);
  });
  targetPicker.append(question, buttons);
}

function resolveChicana(targetIndex) {
  const attacker = players[currentPlayer];
  const target = players[targetIndex];
  const amount = pendingCard.steal;
  targetPicker.classList.add('hidden');

  if (target.shield) {
    target.shield = false;
    addLog(`${attacker.name} quiso bardear a ${target.name}, pero el escudo lo dejó pagando.`);
  } else {
    const stolen = Math.min(amount, target.fame);
    target.fame -= stolen;
    attacker.fame += stolen;
    addLog(`${attacker.name} le robó ${stolen} de fama a ${target.name}. Chicana efectiva.`);
  }
  pendingCard = null;
  finishTurn();
}

function resolveCard(card) {
  const player = players[currentPlayer];
  if (card.type === 'fame') {
    let amount = card.fame;
    if (card.comeback && isLeading(player)) amount = 1;
    player.fame += amount;
    addLog(`${player.name} jugó ${card.title} y sumó ${amount} de fama.`);
  }

  if (card.type === 'shield') {
    if (player.shield) {
      player.fame += 1;
      addLog(`${player.name} ya tenía escudo: lo canjeó por 1 de fama.`);
    } else {
      player.shield = true;
      addLog(`${player.name} quedó protegido contra la próxima chicana.`);
    }
  }
  finishTurn();
}

function finishTurn() {
  const player = players[currentPlayer];
  if (player.fame >= WINNING_FAME) {
    endGame(player, 'llegó primero a 12 de fama. Puede presumir hasta que arranque la revancha.');
    return;
  }

  draw(player);
  if (!deck.length && players.every((entry) => !entry.hand.length)) {
    const topScore = Math.max(...players.map((entry) => entry.fame));
    const winners = players.filter((entry) => entry.fame === topScore);
    endGame(winners[0], winners.length > 1 ? `empató en ${topScore} de fama con ${winners.slice(1).map((entry) => entry.name).join(' y ')}. Discútanlo como adultos: mal.` : `ganó por mazo agotado con ${topScore} de fama.`);
    return;
  }

  currentPlayer = (currentPlayer + 1) % players.length;
  turn += 1;
  handVisible = false;
  renderTurn();
}

function endGame(champion, copy) {
  gameOver = true;
  renderScoreboard();
  winnerTitle.textContent = `¡Ganó ${champion.name}!`;
  winnerCopy.textContent = copy;
  winner.classList.remove('hidden');
}

function startGame() {
  const names = [...playerFields.querySelectorAll('input')].map((input, index) => input.value.trim() || `Gurru ${index + 1}`);
  players = names.map((name) => ({ name, fame: 0, shield: false, hand: [] }));
  deck = buildDeck();
  players.forEach((player) => draw(player, 3));
  currentPlayer = 0;
  turn = 1;
  handVisible = false;
  pendingCard = null;
  gameOver = false;
  history = ['El mazo está mezclado. Que empiece el bardo estratégico.'];
  setup.classList.add('hidden');
  game.classList.remove('hidden');
  winner.classList.add('hidden');
  targetPicker.classList.add('hidden');
  renderTurn();
}

countButtons.addEventListener('click', (event) => {
  const button = event.target.closest('button[data-count]');
  if (!button) return;
  playerCount = Number(button.dataset.count);
  countButtons.querySelectorAll('button').forEach((entry) => entry.classList.toggle('selected', entry === button));
  makePlayerFields();
});

document.querySelector('#start').addEventListener('click', startGame);
document.querySelector('#reveal').addEventListener('click', () => {
  handVisible = true;
  renderTurn();
});
document.querySelector('#new-game').addEventListener('click', () => {
  game.classList.add('hidden');
  setup.classList.remove('hidden');
  winner.classList.add('hidden');
  makePlayerFields();
});
document.querySelector('#play-again').addEventListener('click', startGame);
document.querySelector('#rules').addEventListener('click', () => rulesCard.classList.toggle('hidden'));

makePlayerFields();
