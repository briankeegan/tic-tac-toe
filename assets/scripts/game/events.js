'use strict'

const api = require(`./api`)
const ui = require(`./ui`)
// const store = require('../store')

const logic = require('./logic')

const onMakeMove = function () {
  const index = this.dataset.index
  const message = logic.makeMove(index, this)
  $('#message').text(message)
}

const onGetPlayerStats = function () {
  api.onGetPlayerStats()
    .then(ui.getPlayersSuccess)
    .catch(ui.getPlayersFailure)
}

const addHandler = function () {
  // SHOULD only allow clickable when  signed in, and new game
  $('.box').on('click', onMakeMove)
  $('#playerStatsButton').on('click', onGetPlayerStats)
}

module.exports = {
  addHandler
}
