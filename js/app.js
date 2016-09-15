// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = GenerateRandom(0,400);
    this.y = GenerateRandom(10,240);
    this.step = GenerateRandom(0,50);
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += dt*this.step;
    if (this.x > ctx.canvas.width) {
      this.destroy();
      RemoveEnemy();
      InitializeEnemy();
    }
    //this.y += dt;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.destroy = function(){
  this.delete = true;
}
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(){
    this.sprite='images/char-boy.png';
    this.x = 400;
    this.y = 400;
    this.stepX = 0;
    this.stepY = 0;
}
/*Update Player's movement*/
Player.prototype.update = function(){
    this.x += this.check('x');//checks whether we are inside the boundary for x
    this.y += this.check('y');//checks whether we are inside the boundary for y
    this.stepX = 0;
    this.stepY = 0;
}
/*Check whether movement in a particular direction possible*/
Player.prototype.check =function(direction){
    var ret=0;
    switch (direction.toLowerCase()) {
      case 'x':
        var nextStep = this.x + this.stepX;
        ret = (nextStep < 0 || nextStep >  ctx.canvas.width) ? 0 : this.stepX;
        break;
      case 'y':
        nextStep = this.x + this.stepY;
        ret = (nextStep < 0 || nextStep >  ctx.canvas.height) ? 0 : this.stepX;
        break;
      default:

    }
    return ret;
}
/*Render the player*/
Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}
/*Takes the input for the player movement*/
Player.prototype.handleInput = function(key){
    if (!key) {
      return;
    }
    switch (key.toLowerCase()) {
      case 'left':
        this.stepX = -10;
        this.stepY = 0;
        break;
      case 'right':
        this.stepX = 10;
        this.stepY = 0;
        break;
      case 'up':
        this.stepX = 0;
        this.stepY = -10;
        break;
      case 'down':
        this.stepX = 0;
        this.stepY = 10;
        break;
      default:

    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var player = new Player();
var allEnemies=[InitializeEnemy(),InitializeEnemy(),InitializeEnemy()];

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

/*Custom Functions for usage*/

/*To generate random positions for enemy and other similar features*/
function GenerateRandom(start,limit){
  return  Math.floor(Math.random() * limit) + start;
}

/*Initializing new enemy*/
function InitializeEnemy(){
  var enemy = new Enemy();
  allEnemies.push(enemy);
}

/*Removing an enemy*/
function RemoveEnemy(){
  var index;
  allEnemies.forEach(function(item, i){
    if(this.delete){
      index = i;
    }
  });
  allEnemies.splice(index,1);
}
