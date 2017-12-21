'use strict'
const tokens = ['x', 'o']
const tokenOpposites = {x: 'o', o: 'x'}
const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]
const createBoard = function (input) {
  return input || ['', '', '', '', '', '', '', '', '']
}
const board = createBoard()
const checkForWinningMove = function (token, board, indexes) {
  return indexes.every(index => token === board[index])
}

const checkForWinner = function () {
  const turns = board.filter(move => move !== '').length
  const turn = turns % 2 === 0 ? tokens[0] : tokens[1]
  for (let i = 0; i < winningCombos.length; i++) {
    if (checkForWinningMove(tokens[0], board, winningCombos[i])) {
      return ['You won!', winningCombos[i]]
    }
    if (checkForWinningMove(tokens[1], board, winningCombos[i])) {
      return ['You Lost!', winningCombos[i]]
    }
  }
  // If all moves have been made with no winner, its a draw
  if (turns === 9) {
    // This is clunky. Come back and fix
    return ['Draw!', 'Draw']
  } else {
    return [`Game in progress! It's ${turn}'s turn'`, turn]
  }
}
const makeMove = function (index, element) {
  const status = checkForWinner()
  if (Array.isArray(status[1])) {
    return status[0] + ' Game is over!'
  } else if (status[1] === 'Draw') {
    return status[0] + ' Game is over!'
  } else {
    if (board[index] !== '') {
      return `You can't go where a peace is already been placed!
It's still ${tokenOpposites[status[1]]}'s turn'`
    } else {
      board[index] = status[1]
      element.innerHTML = status[1]
      return checkForWinner()[0]
    }
  }
}

module.exports = {
  createBoard,
  checkForWinner,
  makeMove,
  board
}
