'use strict'

const getFormFields = require(`../../../lib/get-form-fields`)
const api = require(`./api`)
const ui = require(`./ui`)

const onSignUp = function (event) {
  const data = getFormFields(this)
  event.preventDefault()
  this.reset()
  api.signUp(data)
    .then(ui.signUpSuccess)
    .catch(ui.signUpFailure)
}

const addHandler = function () {
  $('#sign-up').on('submit', onSignUp)
}

module.exports = {
  addHandler
}
