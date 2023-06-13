// on game load, create 8 felines ( in kitten state )
// add them to each players pool of felines

// when a player clicks a playable square, a kitten is placed in that square.
// any kittens in adjcent squares are booped away from the places kitten (with some caviats)

const kittenWidth = 62.5

const spaceNotOccupied = (kittyPos, newPos) => {
  console.log('kittyPos, newPos', kittyPos, newPos)
  const val = !kittyPos.filter((it) => {
    const thing = `${it[0]}%` === newPos[0] && `${it[1]}%` === newPos[1]
    return thing
  }).length

  return val
}
const kittyShouldBoop = (top, left, x, y) => {
  const value = (((top) === (y + 1)) || ((top) === (y - 1)) || ((top) === (y)))
    && ((left === (x + 1) || left === (x - 1)) || ((left) === (x)))
    && !(((top) === (y)) && ((left) === (x)))

  return value
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