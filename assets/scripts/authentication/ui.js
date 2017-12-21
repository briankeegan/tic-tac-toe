'use strict'

// const store = require('../store')

const signUpSuccess = function (data) {
  console.log('successfully signed up!', data)
}

const signUpFailure = function (error) {
  console.error('error in signing up', error)
}

module.exports = {
  signUpSuccess,
  signUpFailure
}
