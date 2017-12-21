'use strict'

const processStats = function (data) {
  return {
    played: data.games.length || 0,
    // don't forget to finish this later!
    won: null || 0,
    lost: null || 0,
    tied: null || 0,
    unfinished: null || 0
  }
}

const getPlayersSuccess = function (data) {
  const stats = processStats(data)
  Object.keys(stats).forEach(key => {
    $(`#${key}`).text(' ' + stats[key])
  })
}

const getPlayersFailure = function () {
  console.log('failed to get games')
}

module.exports = {
  getPlayersSuccess,
  getPlayersFailure
}
