'use strict'

const logic = require('./logic')

const onMakeMove = function () {
  const index = this.dataset.index
  logic.makeMove(index, this)
}

const addHandler = function () {
  // only allow clickable when  signed in, and new game
  $('.box').on('click', onMakeMove)
}

module.exports = {
  addHandler
}
