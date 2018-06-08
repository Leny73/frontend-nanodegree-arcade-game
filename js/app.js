// Enemies our player must avoid
var Enemy = function(x,y,speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    if (this.x >= 505) {
        this.x = -60;
        this.speed = 100 + Math.floor((Math.random() * 100) + 1); //Source: https://www.w3schools.com/jsref/jsref_random.asp
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

// creating a Player with x,y coordinates and score
var Player = function(x,y,score) {
    this.x=x;
    this.y=y;
    this.sprite = 'images/char-boy.png'
    this.score = score;
};
/*handling the player to be only in the canvas*/ 
Player.prototype.update = function(dt){
    if (this.x > 400) {
        this.x = 400;
    }
    if (this.x < 0) {
        this.x = 0;
    }
    if (this.y > 400) {
        this.y = 400;
    }
    if (this.y < 0) {
        this.y = 0;
        setTimeout(function() {
            player.restart();
            player.score +=1; 
            //adding functionality to add more random bugs to the lanes after a player reaches more than 10 in the score
            if(player.score ===10 || player.score ===20 || player.score ===30 ){
                addBugs = getRandomInt(1,4);
                lane = [60,140,225];
                for(i=0;i<addBugs;i++){
                    allEnemies.push(new Enemy(0,lane[addBugs],getRandomInt(50,150)));
                    console.log(allEnemies);
                }
            }
            console.log (player.score);
        },60);
    }
};
//render function that draws the player on the canvas
Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite),this.x,this.y);
};
//function to handle movements on the grid 
Player.prototype.handleInput = function(arrowKey){
    if(arrowKey == 'right'){
        this.x +=100;
    }
    if(arrowKey == 'left'){
        this.x -=100;
    }
    if(arrowKey == 'up'){
        this.y -=85;
    }
    if(arrowKey == 'down'){
        this.y +=85;
    }
};
//restarting the player position 
Player.prototype.restart = function () {
    this.x = 200;
    this.y = 400;
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
//taken from JavaScript MDN Math.random
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
  }

var randomSpeed1 = getRandomInt(50,150);
var randomSpeed2 = getRandomInt(50,150);
var randomSpeed3 = getRandomInt(50,150);
var allEnemies = [new Enemy(0,60,randomSpeed1), new Enemy(0, 140,randomSpeed2), new Enemy(0, 225,randomSpeed3)];


// Place the player object in a variable called player
var player = new Player(200,400,0);


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

    

