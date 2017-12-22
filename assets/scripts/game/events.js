'use strict'

const getFormFields = require(`../../../lib/get-form-fields`)
const api = require(`./api`)
const ui = require(`./ui`)
// const store = require('../store')

const logic = require('./logic')

const onNewGame = function () {
  api.newGame()
    .then(ui.newGameSuccess)
    .catch(ui.newGameFailure)
}

const onMakeMove = function () {
  const index = this.dataset.index
  const message = logic.makeMove(index, this)
  $('#message').text(message)
}

const onGetPlayerStats = function () {
  api.getPlayerStats()
    .then(ui.getPlayersSuccess)
    .catch(ui.getPlayersFailure)
}

const addHandler = function () {
  $('#newGame').on('click', onNewGame)
  // SHOULD only allow clickable when  signed in, and new game
  $('.box').on('click', onMakeMove)
  $('#playerStatsButton').on('click', onGetPlayerStats)
  $('#openPreviousGame').on('submit', onOpenPreviousGame)
}

const onOpenPreviousGame = function (event) {
  event.preventDefault()
  const data = getFormFields(this)
  api.openPreviousGame(data.game.id)
    .then(ui.openPreviousGameSuccess)
    .catch(ui.openPreviousGameFailure)
}

module.exports = {
  addHandler
}
