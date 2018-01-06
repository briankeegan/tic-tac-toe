'use strict'
const logic = require('../game/logic')
const store = require(`../store`)

const center = [4]
const corner = [0, 2, 6, 8]
const edge = [1, 3, 5, 7]

const findEmptySpot = function (board, moves = [0, 1, 2, 3, 4, 5, 6, 7, 8]) {
  return moves.filter(item => !board[item])
}

const findX = function (board, moves = [0, 1, 2, 3, 4, 5, 6, 7, 8]) {
  return moves.filter(item => board[item] === 'x')
}

const winScenerio = function (board, optionalToken) {
  const token = optionalToken || 'o'
  // consider removing emptyspots
  const emptySpots = findEmptySpot(board)
  for (let i = 0; i < emptySpots.length; i++) {
    const index = emptySpots[i]
    const testBoard = board.slice()
    testBoard[index] = token
    for (let j = 0; j < logic.winningCombos.length; j++) {
      if (logic.checkForWinningMove(token, testBoard, logic.winningCombos[j])) {
        return index
      }
    }
  }
  return -1
}

const loseScenerio = function (board) {
  return winScenerio(board, 'x')
}

const getRandomMove = function (moves) {
  return moves[Math.floor(Math.random() * moves.length)]
}

const aiGetMove = function (board) {
  const emptySpots = findEmptySpot(board)
  // First move is most important!
  if (emptySpots.length === 8) {
    const move = findX(board)[0]
    if (center.indexOf(move) > -1) {
      return getRandomMove(corner)
    } else {
      return center[0]
    }
  }
  const win = winScenerio(board)
  if (win > -1) return win
  const lose = loseScenerio(board)
  if (lose > -1) return lose

  const emptyEdge = findEmptySpot(board, edge)
  const emptyCorner = findEmptySpot(board, corner)
  // x--
  // -o-
  // -x-
  // 012
  // 345
  // 678
  if (emptyEdge.length === 3 && emptyCorner.length === 3) {
    const e = findX(board, edge)[0]
    const c = findX(board, corner)[0]
    if (((e === 1) && (c === 6)) || ((e === 7) && (c === 0))) {
      return 5
    }
    if (((e === 1) && (c === 8)) || ((e === 7) && (c === 2))) {
      return 3
    }
    if (((e === 3) && (c === 2)) || ((e === 5) && (c === 0))) {
      return 7
    }
    if (((e === 3) && (c === 8)) || ((e === 5) && (c === 6))) {
      return 1
    }
  }
  // x--
  // -o-
  // --x
  if (emptyCorner.length === 2) {
    if ((emptyCorner[0] === 0) && (emptyCorner[1] === 8)) {
      return getRandomMove(emptyEdge)
    }
    if ((emptyCorner[0] === 2) && (emptyCorner[1] === 6)) {
      return getRandomMove(emptyEdge)
    }
  }
  if (emptyEdge.length === 2) {
    // -x-
    // xo-
    // ---
    if ((emptyEdge[0] === 1) && (emptyEdge[1] === 3)) {
      return 8
    }
    if ((emptyEdge[0] === 1) && (emptyEdge[1] === 5)) {
      return 6
    }
    if ((emptyEdge[0] === 3) && (emptyEdge[1] === 7)) {
      return 2
    }
    if ((emptyEdge[0] === 5) && (emptyEdge[1] === 7)) {
      return 0
    }
    // ---
    // xox
    // ---
    return getRandomMove(emptyCorner)
  }
  return emptyCorner.length ? getRandomMove(emptyCorner) : (findEmptySpot(board))
}

const aiMove = function () {
  const move = aiGetMove(store.board)
  const element = document.querySelector('.box' + move)
  return [move, element]
}

module.exports = aiMove
