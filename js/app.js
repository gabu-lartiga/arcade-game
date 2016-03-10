//TODO: player selection
//TODO: implement score
//TODO: collectables
//TODO: upgrades; more points for gem, any enemy shield, etc.
var iniPos = {
    x: (202),
    y: (375)
}; // player initial spawn position
var canvasSize = {
    width: 505,
    height: 606
}; // canvas size
var ey = [58, 141, 224]; // y-axis enemies spawn positions
var score = 0;
/**
 * @description Creates a new enemy
 * @constructor
 * @param {integer} x - The position in x-axis of the enemy
 * @param {integer} y - The position in y-axis of the enemy
 * @param {integer} w - The width of the enemy
 * @param {integer} h - The height of the enemy
 * @param {integer} speed - The speed of the enemy
 */
var Enemy = function(x, y, w, h, speed) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h + 25;
    this.speed = speed;
    this.collisionBox = { // collision Box (circle lol)
        radius: (this.width / 3),
        x: (this.x + (this.width / 2)),
        y: (this.y + ((this.height) / 1.8))
    };
    this.sprite = 'images/enemy-bug.png';
};
Enemy.prototype.update = function(dt) {
    this.x = this.x + this.speed * dt;
    this.attachCollisionBox(this.x);
    this.deleteAll(allEnemies); // the array never will be so big, then the loop will never take too much time
};
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    // this.drawCollisionBox();
};
Enemy.prototype.attachCollisionBox = function(x) {
    this.collisionBox.x = x + (this.width / 2);
};
Enemy.prototype.drawCollisionBox = function() {
    ctx.beginPath();
    ctx.arc(this.collisionBox.x, this.collisionBox.y, this.collisionBox.radius, 0, 2 * Math.PI);
    ctx.stroke();
};
/**
 * @description Instantiate Enemy in a random position with random speed and add it to allEnemies array
 */
Enemy.prototype.create = function() {
    var indy = Math.floor((Math.random() * 3)); //random y-axis spawn position
    var randSpeed = Math.floor((Math.random() * 250) + 150);
    var enemy = new Enemy(-101, ey[indy], 101, 173, randSpeed);
    allEnemies.push(enemy);
};
/**
 * @description Delete all the enemies that are outside of the canvas
 * @param {array} enemies - All the enemies in the canvas
 */
Enemy.prototype.deleteAll = function(enemies) {
    var enemy;
    for (var i = 0; i < enemies.length; i++) {
        enemy = enemies[i];
        if (enemy.x > 550) {
            enemies.splice(i, 1);
        }
    }
};

/**
 * @description Creates a new player
 * @constructor
 * @param {integer} x - The position in x-axis of the player
 * @param {integer} y - The position in y-axis of the player
 * @param {integer} w - The width of the player
 * @param {integer} h - The height of the player
 */
var Player = function(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h + 25;
    this.collisionBox = { //collision Box (circle lol)
        radius: (this.width / 4.5),
        x: (this.x + ((this.width) / 2)),
        y: (this.y + (this.height / 1.75))
    };
    this.sprite = 'images/char-boy.png';
    this.win = false;
};
Player.prototype.update = function(dt) {
    //if player 'collides' with water
    if (this.y <= 0) {
        this.win = true;
        allEnemies.splice(0, allEnemies.length);
        window.setTimeout(function() {
            player.reset();
        }, 1000);

    } else { // if player is out of water the game start again
        this.win = false;
    }
    this.attachCollisionBox(this.x, this.y);
    this.checkCollisions(allEnemies);
};
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    if (this.win) {
        this.displayWinText();
    }
    // this.drawCollisionBox();
};
Player.prototype.handleInput = function(key) {
    if (this.x >= 101 && key === 'left') { // Sanity check
        this.x = this.x - 101; // move Left
    }
    if (this.x <= 303 && key === 'right') {
        this.x = this.x + 101; // move Right
    }
    if (this.y > 0 && key === 'up') {
        this.y = this.y - 83; // move Up
    }
    if (this.y < 375 && key === 'down') {
        this.y = this.y + 83; // move Down
    }
};
Player.prototype.attachCollisionBox = function(x, y) {
    this.collisionBox.x = x + (this.width / 2);
    this.collisionBox.y = y + (this.height / 1.75);
};
Player.prototype.reset = function() {
    this.x = iniPos.x;
    this.y = iniPos.y;
};
/**
 * @description Check for collisions using Circle Collision detection
 * @param {array} enemies - All the enemies in the canvas
 * @param {object} player - The player instance
 */
Player.prototype.checkCollisions = function(enemies) { //they are actually circles not boxes, but collisionBox is the standard name
    for (var i = 0; i < enemies.length; i++) {
        var enemy = enemies[i];
        var dx = this.collisionBox.x - enemy.collisionBox.x;
        var dy = this.collisionBox.y - enemy.collisionBox.y;
        var distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < this.collisionBox.radius + enemy.collisionBox.radius) {
            enemies.splice(i, 1);
            this.reset();
            this.win = false;
        }
    }
};
/**
 * @description Draws the collision box of an object
 * @param {object} obj - An object that has collisionBox to draw
 */
Player.prototype.drawCollisionBox = function() {
    ctx.beginPath();
    ctx.arc(this.collisionBox.x, this.collisionBox.y, this.collisionBox.radius, 0, 2 * Math.PI);
    ctx.stroke();
};
/**
 * @description Set and write win text
 */
Player.prototype.displayWinText = function() {
    ctx.font = '36pt Impact';
    ctx.textAlign = 'center';
    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 3;
    ctx.fillText('Winner!', canvasSize.width / 2, canvasSize.height / 2);
    ctx.strokeText('Winner!', canvasSize.width / 2, canvasSize.height / 2);
};
var player = new Player(iniPos.x, iniPos.y, 101, 173); //Player instantiation

var allEnemies = [];
var enemySpawn = 1000; //time to spawn an enemy: 1sec

//New Enemy instantiation every 1 sec
window.setInterval(function(){
    var enemy = new Enemy();
    enemy.create();}, enemySpawn);

// This listens for key presses and sends the keys to Player.handleInput() method
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});