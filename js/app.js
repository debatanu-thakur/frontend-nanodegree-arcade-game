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

Player.prototype.update = function(){
    this.x += this.stepX;
    if (this.y >= 0) {
      this.y += this.stepY;
    }

    this.stepX = 0;
    this.stepY = 0;
}

Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

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
var allEnemies=[new Enemy(), new Enemy(), new Enemy()];

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
function GenerateRandom(start,limit){
  return  Math.floor(Math.random() * limit) + start;
}

function InitializeEnemy(){
  var enemy = new Enemy();
  allEnemies.push(enemy);
}

function RemoveEnemy(){
  var index;
  allEnemies.forEach(function(item, i){
    if(this.delete){
      index = i;
    }
  });
  allEnemies.splice(index,1);
}
