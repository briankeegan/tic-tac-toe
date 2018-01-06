'use strict'

const store = require('../store')
const logic = require('./logic')

const setUpBoard = function (data) {
  store.game = data.game
  store.board = logic.createBoard(store.game.cells)
  store.board.forEach((token, i, arr) => {
    const box = document.querySelector('.box' + i)
    box.innerHTML = token
  })
  const status = logic.checkForWinner()
  $('#message').text(status[0])
  if (Array.isArray(status[1])) {
    status[1].forEach(i => {
      const box = document.querySelector('.box' + i)
      const text = box.innerHTML
      box.innerHTML = `<div class="winner">${text}</div>`
    })
  }
}

const processGames = function (games, callback, element) {
  // defaults to gameinfo, but can be used for more...
  const gameInfo = element || $('#gameinfo')
  // Clear board
  gameInfo.empty()
  const c = callback ||
  // Default callback is game is over or it is the current game being played skip game
  function (game) {
    return (game.over ||
      game.player_o ||
      (store.game && store.game.id === game.id))
  }
  games.forEach((game, i) => {
    // if the call back returns true, game will be skipped
    if (c(game)) return
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
  setUpBoard(data)
  $('#message').on('New game created.  Good luck!')
  store.ai = false
}

const newGameFailure = function () {
  $('#message').on('Failed to create New Game')
}

const newGameAiSuccess = function (data) {
  store.ai = true
  $('.navbar-collapse').collapse('hide')
  setUpBoard(data)
  $('#message').on('AI cannot be defeated... beep beep boop')
}

const newGameAiFailure = function () {
  $('#message').on('Failed to create New Game With Friendly AI')
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
  $('#message').on('failed to get games')
}

const openPreviousGameSuccess = function (data) {
  store.ai = false
  $('.navbar-collapse').collapse('hide')
  setUpBoard(data)
}
const openPreviousGameFailure = function () {
  $('#message').on('Unable to retrieve game')
}

const startOnlinGameSuccess = function (data) {
  store.ai = false
  document.getElementById('secretInput').value = store.game.id
  $('#message').on('Waiting for player to join...')
  store.isWaiting = true
}

const joinOnlineGameSuccess = function (data) {
  setUpBoard(data)
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
