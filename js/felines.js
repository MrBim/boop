// on game load, create 8 felines ( in kitten state )
// add them to each players pool of felines

// when a player clicks a playable square, a kitten is placed in that square.
// any kittens in adjcent squares are booped away from the places kitten (with some caviats)
const kittenWidth = 62.5
class Game {
  playerOneSpace
  playerTwoSpace
  gameBoard
  playersTurn = 1
  felines = []
  constructor() {
    this.startGame()
  }
  startGame() {
    this.playerOneSpace = document.getElementById('playerSpace1')
    this.playerTwoSpace = document.getElementById('playerSpace2')
    this.gameBoard = document.getElementById('game')
    // break this out in to its own method.
    this.gameBoard.addEventListener('click', (e) => {
      const newX = Math.floor((e.x - 200)/ kittenWidth)
      const newY = Math.floor((e.y) / kittenWidth)

      console.log('newX, newY', newX, newY, this.playersTurn)
      this.nextTurn()
      // const newFeline = makeNewFeline(newY, newX
      // gameBoard.appendChild(newFeline)
      // boop(newX, newY)
      // updateTurn()
  }, false)
  
    ;[...Array(16).keys()].forEach((it) => {
      this.felines.push(new Feline(it, this.playerOneSpace, this.playerTwoSpace))
    })

  }
  nextTurn() {
    this.playersTurn = Math.abs(this.playersTurn - 1)
  }
  getTurn() {
    return this.playersTurn
  }
  placeFeline(feline) {

  }
}

class Feline {
  id = 'kitten-1'
  player
  x = 0
  y = 0
  maturity
  isInPlay = false
  domNode

  constructor(player, playerOneSpace, playerTwoSpace) {
    this.maturity = 'kitten'
    this.player = player % 2
    this.domNode = this.makeNewFeline(player)
    if (!(player % 2)) {
      playerOneSpace.appendChild(this.domNode)
    } else {
      playerTwoSpace.appendChild(this.domNode)
    }
    this.domNode
  }

  addToBoard(x, y) {
    this.setPosition(x, y)
    this.isInPlay = true
  }

  getPosition() {
    return [this.x, this.y]
  }

  setPosition(x, y) {
    this.x = x
    this.y = y
  }

  getPlayer() {
    return this.player
  }

  getMaturity() {
    return this.maturity
  }

  upgradeToCat() {
    this.maturity = 'cat'
  }
  makeNewFeline(currentPlayer) {
    const blankFeline = document.createElement('div')
    blankFeline.classList.add(`feline`)
    blankFeline.classList.add(`player-${currentPlayer % 2}`)
    blankFeline.classList.add('kitten')
    // blankFeline.style.cssText = `top: ${top * 12.5}% left: ${left * 12.5}%`
    return blankFeline
  }
}

const runGame = () => {
  console.log('running game')
  const myGame = new Game()
  myGame.startGame()
}

function ready(fn) {
  if (document.readyState !== 'loading') {
    fn()
  } else {
    document.addEventListener('DOMContentLoaded', fn)
  }
}


ready(runGame)