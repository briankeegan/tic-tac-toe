'use strict'
const store = require('../store')
const tokens = ['x', 'o']
const api = require(`./api`)
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
      return ['You won!', winningCombos[i], true]
    }
    if (checkForWinningMove(tokens[1], board, winningCombos[i])) {
      return ['You Lost!', winningCombos[i], true]
    }
  }
  // If all moves have been made with no winner, its a draw
  if (turns === 9) {
    // This is clunky. Come back and fix
    return ['Draw!', 'Draw', true]
  } else {
    return [`Game in progress! It's ${turn}'s turn'`, turn, false]
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
      return `You can't go where a token has already been placed!
It's still ${status[1]}'s turn'`
    } else {
      board[index] = status[1]
      element.innerHTML = status[1]
      store.sendMove = {
        game: {
          cell: {
            index: index,
            value: status[1]
          },
          // Convoluted, must fix this whole section...
          over: checkForWinner()[2]
        }
      }
      // api.sendMove(store.sendMove)
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
