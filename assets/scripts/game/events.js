'use strict'

// const getFormFields = require(`../../../lib/get-form-fields`)
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
    .then(ui.getPlayerStatsSuccess)
    .catch(ui.getPlayerStatsFailure)
}

const onOpenPreviousGame = function (event) {
  const id = event.currentTarget.dataset.id
  $('#openPreviousGameModal').modal('toggle')
  api.openPreviousGame(id)
    .then(ui.openPreviousGameSuccess)
    .catch(ui.openPreviousGameFailure)
}

const addUninishedHandler = () => {
  $('.unfinished').on('click', onOpenPreviousGame)
}

const onGetPlayerGames = function () {
  api.getPlayerStats()
    // only diff is ui on success updates openPreviousGame modal
    .then(ui.getPlayerGamesSuccess)
    .then(addUninishedHandler)
    .catch(ui.getPlayerStatsFailure)
}

const addHandler = function () {
  $('#newGame').on('click', onNewGame)
  $('.box').on('click', onMakeMove)
  $('#playerStatsButton').on('click', onGetPlayerStats)
  $('#openPreviousGameButton').on('click', onGetPlayerGames)
}

module.exports = {
  addHandler
}
