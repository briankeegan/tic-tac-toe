'use strict'

const setAPIOrigin = require('../../lib/set-api-origin')
const config = require('./config')
const tttlogic = require('./tttlogic')

$(() => {
  setAPIOrigin(location, config)
})

$(() => {
  console.log(tttlogic.makeMove(0))
  console.log(tttlogic.makeMove(4))
  console.log(tttlogic.makeMove(1))
  console.log(tttlogic.makeMove(7))
  console.log(tttlogic.makeMove(2))
  console.log(tttlogic.makeMove(0))
  console.log(tttlogic.makeMove(6))
  console.log(tttlogic.makeMove(7))
  console.log(tttlogic.makeMove(8))
  // console.log(tttlogic.makeMove(8))
  console.log(tttlogic.board)
})

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')
