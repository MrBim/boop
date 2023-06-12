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
      const newX = Math.floor((e.x - 200) / kittenWidth)
      const newY = Math.floor((e.y) / kittenWidth)

      const designatedFeline = this.felines.filter((it) => (it.player === this.playersTurn) && !it.isInPlay)[0];
      this.placeFeline(designatedFeline, newX, newY)
      this.boop(newX, newY)
      this.nextTurn()
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
  placeFeline(feline, x, y) {
    feline.isInPlay = true
    this.moveFeline(feline, x, y)
  }
  moveFeline(feline, x, y) {
    feline.domNode.style.cssText = `top: ${y * 12.5}%; left: ${x * 12.5}%;`
    feline.x = x
    feline.y = y
    this.gameBoard.appendChild(feline.domNode)
  }
  boop = (x, y) => {
    const kittens = this.felines
    const kittyPositions = [];

    for (let i = 0; i < kittens.length; i++) {
      const kitten = kittens[i].node;
      const top = kittens[i].y
      const left = kittens[i].x
      kittyPositions.push([top, left]);
    }

    for (let i = 0; i < kittens.length; i++) {
      const kitten = kittens[i].domNode
      const top = kittens[i].y
      const left = kittens[i].x

      if (kittyShouldBoop(top, left, x, y)) {
        let newTop = `${top}%`
        let newLeft = `${left}%`

        if ((top / 12.5) === (y + 1)) {
          newTop = `${top + 12.5}%`;
        }
        if ((top / 12.5) === (y - 1)) {
          newTop = `${top - 12.5}%`;
        }
        if ((left / 12.5) === (x + 1)) {
          newLeft = `${left + 12.5}%`;
        }
        if ((left / 12.5) === (x - 1)) {
          newLeft = `${left - 12.5}%`;
        }

        if (spaceNotOccupied(kittyPositions, [newTop, newLeft])) {
          kitten.style.top = newTop;
          kitten.style.left = newLeft;
          kitten.style.cssText = `top: ${newTop}; left: ${newLeft};`
        }
        if (newTop === '0%' || newTop === '87.5%' || newLeft === '0%' || newLeft === '87.5%') {
          setTimeout(() => {
            kitten.remove();
          }, 1250);
        }
      }
    }
  }
}
const spaceNotOccupied = (kittyPos, newPos) => !kittyPos.filter(it => `${it[0]}%` === newPos[0] && `${it[1]}%` === newPos[1]).length;

const kittyShouldBoop = (top, left, x, y) => {
  return (((top / 12.5) === (y + 1)) || ((top / 12.5) === (y - 1)) || ((top / 12.5) === (y)))
    && ((left / 12.5 === (x + 1) || left / 12.5 === (x - 1)) || ((left / 12.5) === (x)))
    && !(((top / 12.5) === (y)) && ((left / 12.5) === (x)));
}
class Feline {
  id = 1
  player
  x = 0
  y = 0
  maturity
  isInPlay = false
  domNode

  constructor(player, playerOneSpace, playerTwoSpace) {
    this.id = player
    this.maturity = 'kitten'
    this.player = player % 2
    this.domNode = this.makeNewFeline(player)

    if (!(player % 2)) {
      playerOneSpace.appendChild(this.domNode)
    } else {
      playerTwoSpace.appendChild(this.domNode)
    }

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
}

function ready(fn) {
  if (document.readyState !== 'loading') {
    fn()
  } else {
    document.addEventListener('DOMContentLoaded', fn)
  }
}


ready(runGame)