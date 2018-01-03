'use strict'

const getFormFields = require(`../../../lib/get-form-fields`)
const api = require(`./api`)
const ui = require(`./ui`)
const uimethods = require('../uimethods')
const multiplayerEvents = require('../multiplayer/events')
const aiLogic = require('../ai/logic')
const store = require('../store')

const logic = require('./logic')

const onNewGame = function () {
  api.newGame()
    .then(ui.newGameSuccess)
    .catch(ui.newGameFailure)
}

const onNewGameAi = function () {
  api.newGame()
    .then(ui.newGameAiSuccess)
    .catch(ui.newGameAiFailure)
}

const onMakeMove = function () {
  if (store.isWaiting) return
  const index = this.dataset.index
  let message
  if (store.game && (store.game.player_o || store.game.player_o_id)) {
    message = logic.makeMoveOnline(index, this)
  } else if (store.ai) {
    message = logic.makeMove(index, this)
    // this is a hack
    if (message === `Game in progress! It's o's turn`) {
      const ai = aiLogic.aiMove()
      message = logic.makeMove(ai[0], ai[1])
    }
  } else {
    message = logic.makeMove(index, this)
  }
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

const addUnfinishedHandler = () => {
  $('.unfinished').on('click', onOpenPreviousGame)
}

const onGetPlayerGames = function () {
  api.getPlayerStats()
    // only diff is ui on success updates openPreviousGame modal
    .then(ui.getPlayerGamesSuccess)
    .then(addUnfinishedHandler)
    .catch(ui.getPlayerStatsFailure)
}

const onOpenPreviousGameModalClose = function () {
  $('#gameinfo').empty()
}

const onStartOnlineGame = function () {
  api.newGame()
    .then(ui.newGameSuccess)
    .then(ui.startOnlinGameSuccess)
    .then(multiplayerEvents.onCreateGameWatcher)
    .catch(ui.newGameFailure)
}

const onJoinOnlineGame = function (event) {
  event.preventDefault()
  const data = getFormFields(this)
  const id = data.game.id
  this.reset()
  $('.navbar-collapse').collapse('hide')
  $('#joinOnlineGameModal').modal('toggle')
  api.joinOnlineGame(id)
    .then(ui.joinOnlineGameSuccess)
    .then(multiplayerEvents.onCreateGameWatcher)
    .catch(ui.joinOnlineGameFailure)
}

const addHandler = function () {
  $('#newGame').on('click', onNewGame)
  $('#newGameAi').on('click', onNewGameAi)
  $('.box').on('click', onMakeMove)
  $('#playerStatsButton').on('click', onGetPlayerStats)
  $('#openPreviousGameButton').on('click', onGetPlayerGames)
  // when modal is closed, reset content
  $('#openPreviousGameModal').on('hidden.bs.modal', onOpenPreviousGameModalClose)
  $('#startOnlineGameButton').on('click', onStartOnlineGame)
  $('#startOnlinGameId').on('click', uimethods.copyToClipBoard)
  $('#joinOnlineGame').on('submit', onJoinOnlineGame)
}

module.exports = {
  addHandler
}
