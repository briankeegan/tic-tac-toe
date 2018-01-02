'use strict'

const getFormFields = require(`../../../lib/get-form-fields`)
const api = require(`./api`)
const ui = require(`./ui`)
const store = require('../store')

const onSignUp = function (event) {
  const data = getFormFields(this)
  event.preventDefault()
  this.reset()
  $('#signUpModal').modal('toggle')
  if (data.credentials.password === data.credentials.password_confirmation) {
    api.signUp(data)
      .then(ui.signUpSuccess)
      .catch(ui.signUpFailure)
  } else {
    ui.signUpFailure()
  }
}

const onSignIn = function (event) {
  const data = getFormFields(this)
  event.preventDefault()
  this.reset()
  api.signIn(data)
    .then(ui.signInSuccess)
    .catch(ui.signInFailure)
}

const onChangePassword = function (event) {
  const data = getFormFields(this)
  event.preventDefault()
  this.reset()
  $('#changePasswordModal').modal('toggle')
  if (data.passwords.new === data.passwords['new-retyped']) {
    api.changePassword(data)
      .then(ui.changePasswordSuccess)
      .catch(ui.changePasswordFailure)
  } else {
    ui.changePasswordFailure()
  }
}

const onLogout = function (event) {
  event.preventDefault()
  if (store.user1) {
    event.preventDefault()
    api.logout()
      .then(ui.logoutSuccess)
      .catch(ui.logoutFailure)
  } else {
    ui.logoutFailure()
  }
}
const addHandler = function () {
  $('#sign-up').on('submit', onSignUp)
  $('#sign-in').on('submit', onSignIn)
  $('#change-password').on('submit', onChangePassword)
  $('#logout').on('click', onLogout)
}

module.exports = {
  addHandler
}
