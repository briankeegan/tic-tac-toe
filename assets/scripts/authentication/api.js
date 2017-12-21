'use strict'
const store = require('../store')
const config = require('../config')

const signUp = function (data) {
  return $.ajax({
    url: config.apiOrigin + '/sign-up',
    method: 'POST',
    data
  })
}

const signIn = function (data) {
  return $.ajax({
    url: config.apiOrigin + '/sign-in',
    method: 'POST',
    data
  })
}

const changePassword = function (data) {
  return $.ajax({
    url: config.apiOrigin + '/change-password/' + store.user1.id,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.user1.token
    },
    data
  })
}

const logout = function () {
  return $.ajax({
    url: config.apiOrigin + '/sign-out/' + store.user1.id,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + store.user1.token
    }
  })
}

module.exports = {
  signUp,
  signIn,
  changePassword,
  logout
}
