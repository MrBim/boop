// on game load, create 8 felines ( in kitten state )
// add them to each players pool of felines

// when a player clicks a playable square, a kitten is placed in that square.
// any kittens in adjcent squares are booped away from the places kitten (with some caviats)

class Game {
  playersTurn = 1;
  felines = [];
  startGame() {
    [...Array(16).keys()].forEach((it) => {
      this.felines.push(new Feline(it))
    })
  }
  nextTurn() {
    this.playersTurn = Math.abs(playersTurn - 1);
  }
}

class Feline {
  id = 'kitten-1';
  player;
  x = 0;
  y = 0;
  maturity;
  isInPlay = false;
  domNode

  constructor(player) {
    this.maturity = 'kitten';
    this.player = player % 2;
    this.domNode = document.getElementById(id)
  };

  addToBoard(x, y) {
    this.setPosition(x,y);
    this.isInPlay = true; 
  }

  getPosition() {
    return [this.x, this.y];
  }

  setPosition(x, y) {
    this.x = x;
    this.y = y;
  }

  getPlayer() {
    return this.player;
  }
  
  getMaturity(){
    return this.maturity;
  }

  upgradeToCat() {
    this.maturity = 'cat';
  }
}