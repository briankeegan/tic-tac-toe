'use strict'

const store = require('../store')
const config = require('../config')

const newGame = function () {
  return $.ajax({
    url: config.apiOrigin + '/games',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + store.user1.token
    }
  })
}

const sendMove = function (data) {
  return $.ajax({
    url: config.apiOrigin + '/games/' + store.game.id,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.user1.token
    },
    data
  })
}

const getPlayerStats = function () {
  return $.ajax({
    url: config.apiOrigin + '/games',
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user1.token
    }
  })
}

const openPreviousGame = function (id) {
  return $.ajax({
    url: config.apiOrigin + '/games/' + id,
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user1.token
    }
  })
}

const joinOnlineGame = function (id) {
  return $.ajax({
    url: config.apiOrigin + '/games/' + id,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.user1.token
    }
  })
}

module.exports = {
  getPlayerStats,
  newGame,
  sendMove,
  openPreviousGame,
  joinOnlineGame
}
