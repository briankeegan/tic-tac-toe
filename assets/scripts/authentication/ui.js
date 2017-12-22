'use strict'

const uimethods = require('../uimethods')
const store = require('../store')

const signUpSuccess = function () {
  uimethods.updateMessage('Successfully signed up!')
}

const signUpFailure = function (error) {
  uimethods.updateMessage('Unable to sign up.  Please try a different email')
  console.error(error)
}

const signInSuccess = function (data) {
  store.user1 = data.user
  uimethods.updateMessage('Succesfully signed in as ' + store.user1.email)
}

const signInFailure = function (error) {
  uimethods.updateMessage('Invalid username or password')
  console.error(error)
}

const changePasswordSuccess = function (data) {
  uimethods.updateMessage('successfully changed password!')
}

const changePasswordFailure = function (error) {
  if (error) {
    uimethods.updateMessage('Error changing password')
    console.error(error)
  } else {
    uimethods.updateMessage('Passwords don\'t match')
  }
}

const logoutSuccess = function () {
  uimethods.updateMessage('Successfully signed out!')
  store.user1 = null
}

const logoutFailure = function () {
  uimethods.updateMessage('Error in signing out.  Maybe you\'re not signed in?')
}

module.exports = {
  signUpSuccess,
  signUpFailure,
  signInSuccess,
  signInFailure,
  changePasswordSuccess,
  changePasswordFailure,
  logoutSuccess,
  logoutFailure
}
