import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const elements = new Map();
const makeElement = () => ({
  children: [],
  listeners: {},
  setAttribute(name, value) { this[name] = value; },
  addEventListener(name, callback) { this.listeners[name] = callback; },
  replaceChildren(...children) { this.children = children; },
});
for (const id of ['#board', '#status', '#moves', '#restart']) elements.set(id, makeElement());
let resolve;
const document = {
  querySelector: (selector) => elements.get(selector),
  createElement: makeElement,
};
const context = vm.createContext({ document, setTimeout: (callback) => { resolve = callback; }, clearTimeout: () => { resolve = undefined; }, Math });
vm.runInContext(readFileSync('public/juego1/game.js', 'utf8'), context);

const board = elements.get('#board');
const moves = elements.get('#moves');
assert.equal(board.children.length, 12);
assert.equal(board.children.filter((card) => card.textContent === '?').length, 12);

board.children[0].listeners.click();
assert.notEqual(board.children[0].textContent, '?');
const deck = vm.runInContext('deck', context);
const mismatch = deck.findIndex((symbol) => symbol !== deck[0]);
board.children[mismatch].listeners.click();
assert.equal(moves.textContent, 1);
assert.equal(board.children.filter((card) => card.disabled).length, 12);
resolve();
assert.equal(board.children.filter((card) => card.disabled).length, 0);

elements.get('#restart').listeners.click();
assert.equal(moves.textContent, 0);
assert.equal(board.children.filter((card) => card.textContent === '?').length, 12);
console.log('Game interaction checks passed');
