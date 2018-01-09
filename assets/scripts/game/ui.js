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
  if (status[2]) {
    $('.play-again-h1').show()
    status[1].forEach((index, i) => {
      const box = document.querySelector('.box' + index)
      const text = box.innerHTML
      box.innerHTML = `<div class="winner delay${i}">${text}</div>`
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
  $('.play-again-h1').hide()
  $('.navbar-collapse').collapse('hide')
  setUpBoard(data)
  $('#message').text('New game created.  Good luck!')
  store.ai = false
}

const newGameFailure = function () {
  $('.play-again-h1').hide()
  $('#message').text('Failed to create New Game')
}

const newGameAiSuccess = function (data) {
  $('.play-again-h1').hide()
  store.ai = true
  $('.navbar-collapse').collapse('hide')
  setUpBoard(data)
  $('#message').text('AI cannot be defeated... beep beep boop')
}

const newGameAiFailure = function () {
  $('.play-again-h1').hide()
  $('#message').text('Failed to create New Game With Friendly AI')
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
  $('.play-again-h1').hide()
  $('#message').text('failed to get games')
}

const openPreviousGameSuccess = function (data) {
  $('.play-again-h1').hide()
  store.ai = false
  $('.navbar-collapse').collapse('hide')
  setUpBoard(data)
}
const openPreviousGameFailure = function () {
  $('.play-again-h1').hide()
  $('#message').text('Unable to retrieve game')
}

const sendMoveSuccess = function (data) {
  setUpBoard(data)
}

const sendMoveFailure = function (data) {
  if (data === 'keep') return
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
  sendMoveSuccess,
  sendMoveFailure
}
