'use strict'

const api = require(`./api`)
const ui = require(`./ui`)
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
  if (store.ai) {
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
  $('#body').on('click', onPlayAgain)
}

module.exports = {
  addHandler
}
