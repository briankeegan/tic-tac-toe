'use strict'

const setAPIOrigin = require('../../lib/set-api-origin')
const config = require('./config')
const tttlogic = require('./tttlogic')

$(() => {
  setAPIOrigin(location, config)
})

$(() => {
  console.log(tttlogic.checkForWinner(['x', 'x', 'x', 'y', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x']))
})

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')
