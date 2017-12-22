'use strict'

const store = require('../store')

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

const newGameSuccess = function (data) {
  console.log(data)
  store.game = data.game
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

module.exports = {
  newGameSuccess,
  newGameFailure,
  getPlayersSuccess,
  getPlayersFailure
}
