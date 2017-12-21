'use strict'
const tokens = ['x', 'o']
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

const checkForWinningMove = function (token, board, indexes) {
  return indexes.every(index => token === board[index])
}

const checkForWinner = function (board) {
  const turns = board.filter(move => move !== '').length
  const turn = turns % 2 === 0 ? tokens[0] : tokens[1]
  for (let i = 0; i < winningCombos.length; i++) {
    if (checkForWinningMove(tokens[0], board, winningCombos[i])) {
      return 'You won!' + winningCombos[i]
    }
    if (checkForWinningMove(tokens[1], board, winningCombos[i])) {
      return 'You Lost!' + winningCombos[i]
    }
  }
  // If all moves have been made with no winner, its a draw
  if (turns === 9) {
    return 'Draw'
  } else {
    return `Game in progress!  It's ${turn}'s turn'`
  }
}

module.exports = {
  createBoard,
  checkForWinner,
  checkForWinningMove
}
