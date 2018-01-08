'use strict'

const getFormFields = require(`../../../lib/get-form-fields`)
const api = require(`./api`)
const ui = require(`./ui`)
const copyToClipBoard = require('../copyToClipBoard')
const multiplayerEvents = require('../multiplayer/events')
const aiMove = require('./aiMove')
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
  const ai = aiMove()
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
    const message = logic.makeMoveOnline(index, this)
    $('#message').text(message)
    // this is the route I want to take, but I can't test right now...
    // I will also change the logic file to match

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
    if ((typeof move !== 'string') && (move !== undefined)) {
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

const onHover = function () {
  const insideBox = this.innerHTML
  if (insideBox) {
    this.style.cursor = 'not-allowed'
  } else {
    this.style.cursor = 'pointer'
  }
}

const onPlayAgain = function () {
  if (store.ai) {
    onNewGameAi()
  } else {
    onNewGame()
  }
}

const addHandler = function () {
  $('#newGame').on('click', onNewGame)
  $('#newGameAi').on('click', onNewGameAi)
  $('.box').on('click', onMakeMove)
  $('.box').hover(onHover)
  $('#playerStatsButton').on('click', onGetPlayerStats)
  $('#openPreviousGameButton').on('click', onGetPlayerGames)
  $('#playAgain').on('click', onPlayAgain)
  // when modal is closed, reset content
  $('#openPreviousGameModal').on('hidden.bs.modal', onOpenPreviousGameModalClose)
  $('#startOnlineGameButton').on('click', onStartOnlineGame)
  $('#startOnlinGameId').on('click', copyToClipBoard)
  $('#joinOnlineGame').on('submit', onJoinOnlineGame)
  $('#body').on('click', onPlayAgain)
}

module.exports = {
  addHandler
}
