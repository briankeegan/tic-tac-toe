'use strict'

const updateMessage = function (message) {
  $('#message').text(message)
}

const copyToClipBoard = function () {
  const copyText = document.getElementById('secretInput')
  copyText.select()
  document.execCommand('copy')
  console.log('Copied the text: ' + copyText)
}

module.exports = {
  updateMessage,
  copyToClipBoard
}
