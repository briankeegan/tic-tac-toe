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
const onAiMakeMove = function () {
  const ai = aiLogic.aiMove()
  const move = logic.makeMove(ai[0], ai[1])
  if (typeof move !== 'string') {
    api.sendMove(move)
      .then(ui.sendMoveSuccess)
      .catch(ui.sendMoveFailure)
  }
}
const onMakeMove = function () {
  if (store.isWaiting) return
  const index = this.dataset.index
  const move = logic.makeMove(index, this)
  // Playing online
  if (store.game && (store.game.player_o || store.game.player_o_id)) {

    //this is the route I want to take, but can't test right now...

    // const onlineMove = logic.makeMoveOnline(index, this)
    // if (typeof onlineMove !== 'string') {
    //   api.sendMove(onlineMove)
    //     .then(ui.sendMoveSuccess)
    //     .catch(ui.sendMoveFailure)
    // } else {
    //   ui.sendMoveFailure(onlineMove)
    // }
    // Playing AI
  } else if (store.ai) {
    if (typeof move !== 'string') {
      api.sendMove(move)
        .then(ui.sendMoveSuccess)
        .then(onAiMakeMove)
        .catch(ui.sendMoveFailure)
    } else {
      ui.sendMoveFailure(move)
    }
    // Playing locally
  } else {
    if (typeof move !== 'string') {
      api.sendMove(move)
        .then(ui.sendMoveSuccess)
        .catch(ui.sendMoveFailure)
    } else {
      ui.sendMoveFailure(move)
    }
  }
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
