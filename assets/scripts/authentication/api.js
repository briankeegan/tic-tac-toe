'use strict'
// const store = require('../store')
const config = require('../config')

const signUp = function (data) {
  return $.ajax({
    url: config.apiOrigin + '/sign-up',
    method: 'POST',
    data
  })
}

module.exports = {
  signUp
}
