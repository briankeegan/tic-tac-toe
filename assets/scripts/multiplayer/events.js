'use strict'

// const store = require('../store')
// const config = require('../config')
const api = require(`./api`)
// const ui = require(`./ui`)

const onChange = function (data) {
  if (data.game && data.game.player_o_id) {
    $('#message').text(`Player 'o' has joined the game!  It's your turn!`)
  } else if (data.game && data.game.cells) {
    console.log(data.game.cells)
  }
}

const onCreateGameWatcher = function () {
  // api.createOnlineGame()
  const gameWatcher = api.resourceWatcher(300000)
  gameWatcher.on('change', onChange)
}

module.exports = {
  onCreateGameWatcher
}
