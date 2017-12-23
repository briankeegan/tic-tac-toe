'use strict'

const uimethods = require('../uimethods')

const store = require('../store')
const logic = require('./logic')

const processStats = function (games) {
  const finished = games.filter(game => game.over)
    .map(game => logic.checkForWinner(game.cells))

  return {
    played: games.length || 0,
    // don't forget to finish this later!
    won: finished.filter(game => game[0] === 'You won!').length || 0,
    lost: finished.filter(game => game[0] === 'You lost!').length || 0,
    tied: finished.filter(game => game[0] === 'Draw!').length || 0,
    unfinished: games.filter(game => !game.over).length || 0
  }
}

const setUpBoard = function (data) {
  store.game = data.game
  store.board = logic.createBoard(store.game.cells)
  store.board.forEach((token, i) => {
    $('.box' + i).text(token)
  })
  const message = logic.checkForWinner()[0]
  uimethods.updateMessage(message)
}

const newGameSuccess = function (data) {
  setUpBoard(data)
  uimethods.updateMessage('New game created.  Good luck!')
}

const newGameFailure = function () {
  uimethods.updateMessage('Failed to create New Game')
}

const getPlayerStatsSuccess = function (data) {
  store.games = data.games
  const stats = processStats(store.games)
  Object.keys(stats).forEach(key => {
    $(`#${key}`).text(' ' + stats[key])
  })
}

const getPlayerStatsFailure = function () {
  uimethods.updateMessage('failed to get games')
}

const openPreviousGameSuccess = function (data) {
  setUpBoard(data)
}
const openPreviousGameFailure = function () {
  uimethods.updateMessage('Unable to retrieve game')
}

module.exports = {
  newGameSuccess,
  newGameFailure,
  getPlayerStatsSuccess,
  getPlayerStatsFailure,
  openPreviousGameSuccess,
  openPreviousGameFailure
}
