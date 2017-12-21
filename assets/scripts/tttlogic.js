'use strict'

const createBoard = function (input) {
  return input || ['', '', '', '', '', '', '', '', '', '', '', '']
}

const checkForWinner = function (board) {
  // If all moves have been made with no winner, its a draw
  if (board.every(move => move !== '')) {
    return 'Draw'
  }
}

module.exports = {
  createBoard,
  checkForWinner
}
