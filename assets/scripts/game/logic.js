'use strict'

const tokens = ['x', 'o']
const api = require(`./api`)
const store = require(`../store`)
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
  // Not yet useful but thinking ahead for offline mode..
  return Array.isArray(input) ? input : ['', '', '', '', '', '', '', '', '']
}

const checkForWinningMove = function (token, board, indexes) {
  return indexes.every(index => token === board[index])
}

const checkForWinner = function (optionalBoard) {
  const board = optionalBoard || store.board
  const turns = board.filter(move => move !== '').length
  const turn = turns % 2 === 0 ? tokens[0] : tokens[1]
  for (let i = 0; i < winningCombos.length; i++) {
    if (checkForWinningMove(tokens[0], board, winningCombos[i])) {
      return ['You won!', winningCombos[i], true]
    }
    if (checkForWinningMove(tokens[1], board, winningCombos[i])) {
      return ['You lost!', winningCombos[i], true]
    }
  }
  // If all moves have been made with no winner, its a draw
  if (turns === 9) {
    return ['Draw!', 'Draw', true]
  } else {
    return [`Game in progress! It's ${turn}'s turn'`, turn, false]
  }
}
const makeMove = function (index, element) {
  const board = store.board
  if (!board) {
    console.log('create new game, or find a previous one!')
    return
  }
  const status = checkForWinner()
  if (status[2]) {
    return status[0] + ' Game is over!'
  } else {
    if (board[index] !== '') {
      return `You can't go where a token has already been placed!
It's still ${status[1]}'s turn'`
    } else {
      board[index] = status[1]
      element.innerHTML = status[1]
      const move = {
        game: {
          cell: {
            index: index,
            value: status[1]
          },
          over: checkForWinner()[2]
        }
      }
      api.sendMove(move)
      return checkForWinner()[0]
    }
  }
}

module.exports = {
  checkForWinner,
  makeMove,
  createBoard
}
