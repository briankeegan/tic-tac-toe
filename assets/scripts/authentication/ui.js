'use strict'

const store = require('../store')

const signUpSuccess = function () {
  console.log('successfully signed up!')
}

const signUpFailure = function (error) {
  console.error('error in signing up', error)
}

const signInSuccess = function (data) {
  console.log('successfully signed in!')
  store.user1 = data.user
}

const signInFailure = function (error) {
  console.error('error in signing in', error)
}

module.exports = {
  signUpSuccess,
  signUpFailure,
  signInSuccess,
  signInFailure
}
