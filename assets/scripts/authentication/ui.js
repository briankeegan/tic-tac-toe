'use strict'

const uimethods = require('../uimethods')
const store = require('../store')

const signUpSuccess = function () {
  uimethods.updateMessage('Successfully signed up!')
}

const signUpFailure = function (error) {
  if (error) {
    uimethods.updateMessage('Unable to sign up.  Please try a different email.')
  } else {
    uimethods.updateMessage('Passwords don\'t match')
  }
}

const signInSuccess = function (data) {
  store.user1 = data.user
  uimethods.updateMessage('Succesfully signed in as ' + store.user1.email)
  $('.after-sign-in').css('display', 'block')
  $('.inital-page').toggle()
}

const signInFailure = function () {
  uimethods.updateMessage('Invalid username or password')
}

const changePasswordSuccess = function (data) {
  uimethods.updateMessage('Successfully changed password!')
}

const changePasswordFailure = function (error) {
  if (error) {
    uimethods.updateMessage('Error changing password')
  } else {
    uimethods.updateMessage('Passwords don\'t match')
  }
}

const logoutSuccess = function () {
  uimethods.updateMessage('Successfully signed out!')
  store.user1 = null
  store.games = null
  $('.after-sign-in').css('display', 'none')
  $('.inital-page').toggle()
  $('.box').text('')
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
