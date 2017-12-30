'use strict'

const uimethods = require('../uimethods')

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
  const playersToken = store.token || 'x'
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
    uimethods.updateMessage('Log in to play the game!')
    return
  }
  if (!board) {
    uimethods.updateMessage('Create new game, or load a previous one!')
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

const makeMoveOnline = function (index, element) {
  const board = store.board
  const token = store.token || 'x'
  const status = checkForWinner()
  // if the game is over (returns true)
  if (status[2]) {
    return status[0] + ' Game is over!'
  } else {
    if (token !== status[1]) {
      return `Be patient, it's still ${status[1]}'s turn!'`
    } else {
      if (board[index] !== '') {
        return `You can't go where a token has already been placed!`
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
        return status[0]
      }
    }
  }
}

const setUpBoard = function (data) {
  store.game = data.game
  store.board = createBoard(store.game.cells)
  store.board.forEach((token, i, arr) => {
    $('.box' + i).text(token)
  })
  const message = checkForWinner()[0]
  uimethods.updateMessage(message)
}

const setUpBoardOnline = function (data) {
  Object.keys(data.game).forEach(cur => {
    if (data.game[cur]) store.game[cur] = data.game[cur]
  })
  store.game.cells = store.game.cells[1]
  store.board = createBoard(store.game.cells)
  store.board.forEach((token, i, arr) => {
    $('.box' + i).text(token)
  })
  const message = checkForWinner()[0]
  uimethods.updateMessage(message)
}

const processStats = function (games) {
  const finished = games.filter(game => game.over)
    .map(game => checkForWinner(game.cells))

  return {
    played: games.length || 0,
    won: finished.filter(game => game[0] === 'You won!').length || 0,
    lost: finished.filter(game => game[0] === 'You lost!').length || 0,
    tied: finished.filter(game => game[0] === 'Draw!').length || 0,
    unfinished: games.filter(game => !game.over).length || 0
  }
}

module.exports = {
  checkForWinner,
  makeMove,
  createBoard,
  setUpBoard,
  processStats,
  makeMoveOnline,
  setUpBoardOnline
}
