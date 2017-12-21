'use strict'

const store = require('../store')
const config = require('../config')

const onGetPlayerStats = function () {
  return $.ajax({
    url: config.apiOrigin + '/games',
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user1.token
    }
  })
}

module.exports = {
  onGetPlayerStats
}
