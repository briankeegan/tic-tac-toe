'use strict'

const store = require('../store')
const api = require(`./api`)
const logic = require('../game/logic')

const onCreateGameWatcher = function () {
  const gameWatcher = api.resourceWatcher(300000)
  gameWatcher.on('change', function (data) {
    // if player o joins... get the new data!  Maybe in the future....
    if (data.game && data.game.player_o_id) {
      Object.keys(data.game).forEach(cur => {
        if (data.game[cur]) store.game[cur] = data.game[cur]
      })
      store.isWaiting = false
      $('#message').text(`Player 'o' has joined the game!  It's your turn!`)
    } else if (data.game && data.game.cells) {
      logic.setUpBoardOnline(data)
    } else if (data && data.timeout) {
      $('#message').text('Game timed out!')
      gameWatcher.close()
    }
  })
  gameWatcher.on('error', function (e) {
    // console.error('Error in game watcher', e)
    $('#message').text('Error in game watcher')
  })
}

module.exports = {
  onCreateGameWatcher
}
