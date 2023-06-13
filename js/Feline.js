
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

  removeFromPlay() {
    this.x = 0
    this.y = 0
    this.isInPlay = false
    this.domNode.remove()
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
