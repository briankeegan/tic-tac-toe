'use strict'

const store = require('../store')

const signUpSuccess = function () {
  $('#message').text('Successfully signed up!')
}

const signUpFailure = function (error) {
  if (error) {
    $('#message').text('Unable to sign up.  Please try a different email.')
  } else {
    $('#message').text('Passwords don\'t match')
  }
}

const signInSuccess = function (data) {
  store.user1 = data.user
  $('#message').text('Succesfully signed in as ' + store.user1.email)
  $('.after-sign-in').css('display', 'block')
  $('.inital-page').css('display', 'none')
  $('.navbar-brand').text(store.user1.email)
}

const signInFailure = function () {
  $('#message').text('Invalid username or password')
}

const changePasswordSuccess = function (data) {
  $('.navbar-collapse').collapse('hide')
  $('#message').text('Successfully changed password!')
}

const changePasswordFailure = function (error) {
  if (error) {
    $('#message').text('Error changing password')
  } else {
    $('#message').text('Passwords don\'t match')
  }
}

const logoutSuccess = function () {
  $('.navbar-collapse').collapse('hide')
  $('#message').text('Successfully signed out!')
  store.user1 = null
  store.games = null
  store.game = null
  store.board = null
  store.isWaiting = false
  store.ai = false
  $('.after-sign-in').css('display', 'none')
  $('.inital-page').css('display', 'block')
  $('.box').text('')
  $('.navbar-brand').text('Tic-Tac-Toe')
}

const logoutFailure = function () {
  $('#message').text('Error in signing out.  Maybe you\'re not signed in?')
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
