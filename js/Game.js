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
    console.log('booping', x, y)
    const kittens = this.felines.filter(it => it.isInPlay)

    kittens.forEach((feline) => {
      const top = feline.y
      const left = feline.x
      const kitty = feline.domNode

      if (kittyShouldBoop(top, left, x, y)) {
        let newTop = `${top * 12.5}%`
        let newLeft = `${left * 12.5}%`
        console.log('kitty should boop', newTop, newLeft)

        if ((top) === (y + 1)) {
          newTop = `${(top * 12.5) + 12.5}%`;
        }
        if ((top) === (y - 1)) {
          newTop = `${(top * 12.5) - 12.5}%`;
        }
        if ((left) === (x + 1)) {
          newLeft = `${(left * 12.5) + 12.5}%`;
        }
        if ((left) === (x - 1)) {
          newLeft = `${(left * 12.5) - 12.5}%`;
        }

        if (spaceNotOccupied(kittens, [newTop, newLeft])) {
          console.log('space not occupied')
          kitty.style.top = newTop;
          kitty.style.left = newLeft;
          kitty.style.cssText = `top: ${newTop}; left: ${newLeft};`
          feline.x = newLeft
          feline.y = newTop
        }

        if (newTop === '0%' || newTop === '87.5%' || newLeft === '0%' || newLeft === '87.5%') {
          console.log('set kitten to be removed')
          setTimeout(() => {

            kitty.remove();
          }, 1250);
        }
      }
    })
  }
}
