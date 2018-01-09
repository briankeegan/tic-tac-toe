'use strict'

const tokens = ['x', 'o']
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

const checkForWinner = function (game) {
  const board = (game && game.cells) || store.board
  // This is a workaround so I can determine win status based on previous games
  const playersToken = (game &&
    game.player_o) ||
    (store.user1.id ===
    (store.game &&
    store.game.player_o &&
    store.game.player_o.id) &&
    !game)
    ? 'o' : 'x'
  const turns = board.filter(move => move !== '').length
  const turn = turns % 2 === 0 ? tokens[0] : tokens[1]
  for (let i = 0; i < winningCombos.length; i++) {
    if (checkForWinningMove(tokens[0], board, winningCombos[i])) {
      if (playersToken === tokens[0]) {
        return ['You won!', winningCombos[i], true]
      } else {
        return ['You lost!', winningCombos[i], true]
      }
    }
    if (checkForWinningMove(tokens[1], board, winningCombos[i])) {
      if (playersToken === tokens[0]) {
        return ['You lost!', winningCombos[i], true]
      } else {
        return ['You won!', winningCombos[i], true]
      }
    }
  }
  // If all moves have been made with no winner, its a draw
  if (turns === 9) {
    return ['Draw!', 'Draw', true]
  } else {
    if (playersToken === turn) {
      return [`Game in progress! It's your turn`, turn, false]
    } else {
      return [`Game in progress! It's ${turn}'s turn`, turn, false]
    }
  }
}

const makeMove = function (index, element) {
  const board = store.board
  if (!store.user1) {
    return 'Log in to play the game!'
  }
  if (!board) {
    return 'Create new game, or load a previous one!'
  }
  const status = checkForWinner()
  if (status[2]) {
    return 'keep'
  } else {
    if (board[index] !== '') {
      return `You can't go where a token has already been placed!
It's still ${status[1]}'s turn'`
    } else {
      board[index] = status[1]
      return {
        game: {
          cell: {
            index: index,
            value: status[1]
          },
          over: checkForWinner()[2]
        }
      }
    }
  }
}

const processStats = function (games) {
  const finished = games.filter(game => game.over)
    .map(game => checkForWinner(game))
  const won = finished.filter(game => game[0] === 'You won!')
  const lost = finished.filter(game => game[0] === 'You lost!')
  const tied = finished.filter(game => game[0] === 'Draw!')
  const unfinished = games.filter(game => !game.over && !game.player_o)
  const unfinishedOnline = games.filter(game => !game.over && game.player_o)
  return {
    played: games.length - unfinishedOnline.length || 0,
    won: won.length || 0,
    lost: lost.length || 0,
    tied: tied.length || 0,
    unfinished: unfinished.length || 0
  }
}

module.exports = {
  checkForWinner,
  makeMove,
  createBoard,
  processStats,
  winningCombos,
  checkForWinningMove
}
