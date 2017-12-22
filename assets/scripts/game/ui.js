'use strict'

const store = require('../store')
const logic = require('./logic')

const processStats = function (data) {
  return {
    played: data.games.length || 0,
    // don't forget to finish this later!
    won: null || 0,
    lost: null || 0,
    tied: null || 0,
    unfinished: null || 0
  }
}

const setUpBoard = function (data) {
  store.game = data.game
  store.board = logic.createBoard(store.game.cells)
  store.board.forEach((token, i) => {
    $('.box' + i).text(token)
  })
}

const newGameSuccess = function (data) {
  setUpBoard(data)
}

const newGameFailure = function () {
  console.error('failed to create New Game')
}

const getPlayersSuccess = function (data) {
  const stats = processStats(data)
  console.log(data)
  Object.keys(stats).forEach(key => {
    $(`#${key}`).text(' ' + stats[key])
  })
}

const getPlayersFailure = function () {
  console.error('failed to get games')
}

const openPreviousGameSuccess = function (data) {
  setUpBoard(data)
}
const openPreviousGameFailure = function (error) {
  console.error('Error retrieving game', error)
}

module.exports = {
  newGameSuccess,
  newGameFailure,
  getPlayersSuccess,
  getPlayersFailure,
  openPreviousGameSuccess,
  openPreviousGameFailure
}
