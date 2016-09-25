'use strict';
// Enemies our player must avoid
var Enemy = function() {
    /*
    *   Randomizing the generation of the position of the enemy
    */
    this.x = this.GenerateRandom(0, 200);
    this.y = this.GenerateRandom(10, 240);
    /*  Step tells that how fast the enemy travels along
    *   x-axis
    */
    this.step = this.GenerateRandom(150, 200);
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // If enemy is set up for delete
    // Do not perform update operation
    if (this.delete) {
      return;
    }
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += dt * this.step;
    /*
    * Destroying the enemy when it crosses the
    * canvas width
    */
    if (this.x > ctx.canvas.width) {
        this.destroy(); //  Marks the enemy to be deleted
    }

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/*
*   To destroy an enemy
*   delete property is added
*   is marked true
*/
Enemy.prototype.destroy = function() {
    this.delete = true;
}

/*
*   Get current position of the enemy
*/
Enemy.prototype.position = function() {
    return {x: this.x, y: this.y};
}

/*To generate random positions for enemy and other similar features*/
Enemy.prototype.GenerateRandom = function(start, limit) {
    return Math.floor(Math.random() * limit) + start;
}


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
        this.sprite = 'images/char-boy.png';
        this.x = 200;
        this.y = 400;
        this.stepX = 0;
        this.stepY = 0;
    }
/*
*   Update Player's movement
*/
Player.prototype.update = function() {
        this.x += this.check('x'); //checks whether we are inside the boundary for x
        this.y += this.check('y'); //checks whether we are inside the boundary for y
        this.stepX = 0;
        this.stepY = 0;
    }

/*
*   Check whether movement in a particular direction possible
*/
Player.prototype.check = function(direction) {
        var ret = 0;
        switch (direction.toLowerCase()) {
            case 'x':
                var nextStep = this.x + this.stepX;
                var width = ctx.canvas.width - 100;
                ret = (nextStep < 0 || nextStep >= width) ? 0 : this.stepX;
                break;
            case 'y':
                nextStep = this.y + this.stepY;
                var heit = ctx.canvas.height * 0.7;
                ret = (nextStep < 0 || nextStep >= heit) ? 0 : this.stepY;
                break;
            default:

        }
        return ret;
    }

/*
*   Render the player
*/
Player.prototype.render = function() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

/*
*   Takes the input for the player movement
*/
Player.prototype.handleInput = function(key) {
    if (!key) {
        return;
    }
    var steps = this.steps();
    switch (key.toLowerCase()) {
        case 'left':
            this.stepX = -1*steps;
            this.stepY = 0;
            break;
        case 'right':
            this.stepX = 1*steps;
            this.stepY = 0;
            break;
        case 'up':
            this.stepX = 0;
            this.stepY = -1*steps;
            break;
        case 'down':
            this.stepX = 0;
            this.stepY = 1*steps;
            break;
        default:

    }
}
/*
*   Get current Player position
*/
Player.prototype.position = function() {
    return {x: this.x, y: this.y};
}
/*
*   Default Step, the speed the player moves
*/
Player.prototype.steps = function(){
  return 50;
}


/*Global values to be accessed across the app*/
var player;
var allEnemies = [];
var clear;

/*
*   This function is called the first time
*   when the game is initialized, thus
*   initializing the player object and the
*   allEnemies array with the enemies
*/
function Start(){
    // Now instantiate your objects.
    // Place all enemy objects in an array called allEnemies
    // Place the player object in a variable called player
    player = new Player();
    allEnemies = [];
    InitializeEnemy();
    InitializeEnemy();
    InitializeEnemy();
    clear = setInterval(function(){
      RemoveEnemy();  //  Removes the enemy from the allEnemies array
      InitializeEnemy();
    },500);
}

/*
*   Clear enemy generation
*/
function ClearEnemy(){
  clearInterval(clear);
}
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


/*Initializing new enemy*/
function InitializeEnemy() {
    var enemy = new Enemy();
    allEnemies.push(enemy);
}

/*Removing an enemy*/
function RemoveEnemy() {
    var index;
    allEnemies.forEach(function(item, i) {
        if (item.delete) {
            index = i;
        }
    });
    allEnemies.splice(index, 1);
}
