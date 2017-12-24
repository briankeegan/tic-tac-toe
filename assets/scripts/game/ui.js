'use strict'

const uimethods = require('../uimethods')

const store = require('../store')
const logic = require('./logic')

const processStats = function (games) {
  const finished = games.filter(game => game.over)
    .map(game => logic.checkForWinner(game.cells))

  return {
    played: games.length || 0,
    // don't forget to finish this later!
    won: finished.filter(game => game[0] === 'You won!').length || 0,
    lost: finished.filter(game => game[0] === 'You lost!').length || 0,
    tied: finished.filter(game => game[0] === 'Draw!').length || 0,
    unfinished: games.filter(game => !game.over).length || 0
  }
}

const processGames = function (games) {
  // Clear board
  $('#gameinfo').empty()
  games.forEach((game, i) => {
    // copy the eleemnts from the orginal ttt board
    const tttContainer = document.querySelector('.ttt-container')
    const tttGame = tttContainer.cloneNode(true)
    // change the class names  so they won't accidently get filled!
    tttGame.classList.replace('ttt-container', 'prev-ttt-container')
    tttGame.classList.add('ttt' + i)
    $('#gameinfo').append(tttGame)
    $('#gameinfo').append('<hr>')
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
    const text = document.createTextNode(logic.checkForWinner(game.cells)[0])
    message.appendChild(text)
    tttGame.insertBefore(container, tttGame.firstChild)
    // if the game is not finished, add data-id and class unfinished
    if (!game.over) {
      tttGame.dataset.id = game.id
      tttGame.classList.add('unfinished')
    }
  })
}

const setUpBoard = function (data) {
  store.game = data.game
  store.board = logic.createBoard(store.game.cells)
  store.board.forEach((token, i) => {
    $('.box' + i).text(token)
  })
  const message = logic.checkForWinner()[0]
  uimethods.updateMessage(message)
}

const newGameSuccess = function (data) {
  $('.navbar-collapse').collapse('hide')
  setUpBoard(data)
  uimethods.updateMessage('New game created.  Good luck!')
}

const newGameFailure = function () {
  uimethods.updateMessage('Failed to create New Game')
}

const getPlayerStatsSuccess = function (data) {
  store.games = data.games
  const stats = processStats(store.games)
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
  $('.navbar-collapse').collapse('hide')
  setUpBoard(data)
}
const openPreviousGameFailure = function () {
  uimethods.updateMessage('Unable to retrieve game')
}

module.exports = {
  newGameSuccess,
  newGameFailure,
  getPlayerStatsSuccess,
  getPlayerStatsFailure,
  openPreviousGameSuccess,
  getPlayerGamesSuccess,
  openPreviousGameFailure
}
