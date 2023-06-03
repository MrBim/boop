class feline {
  maturity = 'kitten';
  x = 0;
  y = 0;
  player = 0;
  isInPlay = false;
  id = 'kitten-1';

  constructor(x, y, maturity, player) {
    this.x = x;
    this.y = y;
    this.maturity = maturity;
    this.player = player;
  };

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