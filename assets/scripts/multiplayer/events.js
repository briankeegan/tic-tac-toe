'use strict'

const store = require('../store')
const api = require(`./api`)
const logic = require('../game/logic')

const onCreateGameWatcher = function () {
  const gameWatcher = api.resourceWatcher()
  gameWatcher.on('change', function (data) {
    // if player o joins... get the new data!  Maybe in the future....
    if (data.game && data.game.player_o_id) {
      Object.keys(data.game).forEach(cur => {
        if (data.game[cur]) store.game[cur] = data.game[cur]
      })
      store.isWaiting = false
      $('#message').text(`Player 'o' has joined the game!  It's your turn!`)
    } else if (data.game && data.game.cells) {
      const status = logic.setUpBoardOnline(data)
      if (status) gameWatcher.close()
    } else if (data && data.timeout) {
      $('#message').text('Game timed out!')
      gameWatcher.close()
    }
  })
  gameWatcher.on('error', function (e) {
    // console.error('Error in game watcher', e)
    $('#message').text('Error in game watcher')
    gameWatcher.close()
  })
}

module.exports = {
  onCreateGameWatcher
}
