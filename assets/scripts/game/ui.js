'use strict'

const uimethods = require('../uimethods')

const store = require('../store')
const logic = require('./logic')

const setUpBoard = function (data) {
  store.game = data.game
  store.board = logic.createBoard(store.game.cells)
  store.board.forEach((token, i, arr) => {
    $('.box' + i).text(token)
  })
  const message = logic.checkForWinner()[0]
  $('#message').text(message)
}

const processGames = function (games) {
  // Clear board
  const gameInfo = $('#gameinfo')
  gameInfo.empty()
  games.forEach((game, i) => {
    // if game is over or it is the current game being played skip game
    if (game.over ||
      game.player_o ||
      (store.game && store.game.id === game.id)) {
      return
    }
    // copy the eleemnts from the orginal ttt board
    const tttContainer = document.querySelector('.ttt-container')
    const tttGame = tttContainer.cloneNode(true)
    // change the class names  so they won't accidently get filled!
    tttGame.classList.replace('ttt-container', 'prev-ttt-container')
    tttGame.classList.add('ttt' + i)
    gameInfo.append(tttGame)
    gameInfo.append('<hr>')
    // fill the board
    game.cells.forEach((token, j) => {
      $('.ttt' + i + ' .box' + j).text(token)
    })
    // add appropriate message
    const container = document.createElement('div')
    container.classList.add('container-fluid')
    container.classList.add('message')
    const message = document.createElement('h2')
    container.appendChild(message)
    const text = document.createTextNode(logic.checkForWinner(game)[0].slice(17))
    message.appendChild(text)
    tttGame.insertBefore(container, tttGame.firstChild)
    // if the game is not finished, add data-id and class unfinished
    if (!game.over) {
      tttGame.dataset.id = game.id
      tttGame.classList.add('unfinished')
    }
  })
  // if gameInfo is empty, Inform user they havn't played any games!
  if (!gameInfo.html()) {
    gameInfo.html(`<h2>You have no unplayed games!</h2>`)
  }
}

const newGameSuccess = function (data) {
  $('.navbar-collapse').collapse('hide')
  logic.setUpBoard(data)
  uimethods.updateMessage('New game created.  Good luck!')
  store.ai = false
}

const newGameFailure = function () {
  uimethods.updateMessage('Failed to create New Game')
}

const newGameAiSuccess = function (data) {
  store.ai = true
  $('.navbar-collapse').collapse('hide')
  logic.setUpBoard(data)
  uimethods.updateMessage('AI cannot be defeated... beep beep boop')
}

const newGameAiFailure = function () {
  uimethods.updateMessage('Failed to create New Game With Friendly AI')
}

const getPlayerStatsSuccess = function (data) {
  store.games = data.games
  const stats = logic.processStats(store.games)
  Object.keys(stats).forEach(key => {
    $(`#${key}`).text(' ' + stats[key])
  })
}

const getPlayerGamesSuccess = function (data) {
  store.games = data.games
  processGames(store.games)
}

const getPlayerStatsFailure = function () {
  uimethods.updateMessage('failed to get games')
}

const openPreviousGameSuccess = function (data) {
  store.ai = false
  $('.navbar-collapse').collapse('hide')
  logic.setUpBoard(data)
}
const openPreviousGameFailure = function () {
  uimethods.updateMessage('Unable to retrieve game')
}

const startOnlinGameSuccess = function (data) {
  store.ai = false
  document.getElementById('secretInput').value = store.game.id
  uimethods.updateMessage('Waiting for player to join...')
  store.isWaiting = true
}

const joinOnlineGameSuccess = function (data) {
  logic.setUpBoard(data)
  $('#message').text(`Successfully joined game with ${data.game.player_x.email}`)
}

const joinOnlineGameFailure = function (data) {
  $('#message').text('Unable to join game.  Please check game ID#')
}

const sendMoveSuccess = function (data) {
  setUpBoard(data)
}

const sendMoveFailure = function (data) {
  if (typeof data === 'string') $('#message').text(data)
  else $('#message').text('Unable to make move')
}

module.exports = {
  newGameSuccess,
  newGameFailure,
  newGameAiSuccess,
  newGameAiFailure,
  getPlayerStatsSuccess,
  getPlayerStatsFailure,
  openPreviousGameSuccess,
  getPlayerGamesSuccess,
  openPreviousGameFailure,
  startOnlinGameSuccess,
  joinOnlineGameSuccess,
  joinOnlineGameFailure,
  sendMoveSuccess,
  sendMoveFailure
}
