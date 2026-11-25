const symbols = ['🐉', '🃏', '⚡', '🎮', '👑', '🔥'];
const board = document.querySelector('#board');
const status = document.querySelector('#status');
const movesLabel = document.querySelector('#moves');
let deck = [];
let open = [];
let matched = new Set();
let moves = 0;
let timer;

function render() {
  board.replaceChildren(...deck.map((symbol, index) => {
    const visible = open.includes(index) || matched.has(symbol);
    const card = document.createElement('button');
    card.type = 'button';
    card.className = `card${visible ? ' visible' : ''}`;
    card.textContent = visible ? symbols[symbol] : '?';
    card.setAttribute('aria-label', `Carta ${index + 1}: ${visible ? symbols[symbol] : 'oculta'}`);
    card.disabled = visible || open.length === 2;
    card.addEventListener('click', () => flip(index));
    return card;
  }));
  movesLabel.textContent = moves;
  status.textContent = matched.size === symbols.length
    ? `¡Ganaste en ${moves} movimientos!`
    : `${matched.size} de ${symbols.length} parejas encontradas`;
}

function flip(index) {
  if (open.length === 2 || open.includes(index) || matched.has(deck[index])) return;
  open.push(index);
  if (open.length === 2) {
    moves++;
    timer = setTimeout(() => {
      if (deck[open[0]] === deck[open[1]]) matched.add(deck[open[0]]);
      open = [];
      render();
    }, 700);
  }
  render();
}

function restart() {
  clearTimeout(timer);
  deck = [...symbols.keys(), ...symbols.keys()];
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  open = [];
  matched = new Set();
  moves = 0;
  render();
}

document.querySelector('#restart').addEventListener('click', restart);
restart();
