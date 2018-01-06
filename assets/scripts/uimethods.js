'use strict'

const copyToClipBoard = function () {
  const copyText = document.getElementById('secretInput')
  copyText.select()
  document.execCommand('copy')
}

module.exports = {
  copyToClipBoard
}
