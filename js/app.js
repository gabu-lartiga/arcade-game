// Enemies our player must avoid
var Enemy = function(_x,_y,_speed) {
    this.x = _x;
    this.y = _y;
    this.speed = _speed;
    this.colliderBox = {radius:(this.width/2), x:(this.x+(this.width/2)), y:(this.y+(this.height/2))}; //collision Box (circle lol)
    this.sprite = 'images/enemy-bug.png';
};
Enemy.prototype.update = function(dt) {
    this.x = this.x + this.speed*dt;
    //TODO: if collides then desapear
};

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    //bah
};

//Player Constructor
var Player = function(_x, _y){ // Player constructor
    this.x = _x;
    this.y = _y;
    this.colliderBox = {radius:(this.width/2), x:(this.x+(this.width/2)), y:(this.y+(this.height/2))}; //collision Box (circle lol)
    this.sprite = 'images/char-boy.png';
};

//player initial position
var iniPos = {
    x : (101*2),
    y : (75*5)
};

Player.prototype.update = function(dt){
    //if player "collides" with water
    if(this.y<=0){
        ctx.drawText
        var setPos = setTimeout(
            function(){
                player.x = iniPos.x;
                player.y = iniPos.y;
            }
            , 1000);
    };
};
Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    //duh
};

Player.prototype.handleInput = function(key){
    if(this.x<101){ // 'Out of Canvas' sanity check
    }else{
        if(key==='left'){this.x = this.x - 101;}; // moving Left
    };
    if(this.x>303){ // 'Out of Canvas' sanity check
    }else{
        if(key==='right'){this.x = this.x + 101;}; // moving Right
    };

    if(this.y<=0){ // 'Out of Canvas' sanity check
    }else{
        if(key==='up'){this.y = this.y - 83;}; // moving Up
    };
    if(this.y>=375){ // 'Out of Canvas' sanity check
    }else{
        if(key==='down'){this.y = this.y + 83;}; // moving Down
    };
};

var ey = [58, 141, 224]; // y-axis enemies spawn positions
var allEnemies = [];
var enemyCreation = setInterval(createEnemy,1000);
function createEnemy(){
    var indy = Math.floor((Math.random()*3)); //random y-axis spawn position
    var randSpeed = Math.floor((Math.random()*250)+150);
    allEnemies.push(new Enemy(-101, ey[indy], randSpeed));
};

// function checkCollisions(){  //they are actually circles not boxes but collision Box is the standard
                                // https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
    //for Each enemy check dx dy
    // var dx = player.cCircle.x - allEnemies[].cCircle.x;
    // var dy = player.cCircle.y - allEnemies[].cCircle.y;
    // var distance = Math.sqrt(dx * dx + dy * dy);

    // var answer = null;

    // if (distance < player.cCircle.radius + allEnemies[].cCircle.radius) {
    //     answer = true;
    // } else false;
    // return answer;
// };

//TODO: delete unused(out of canvas) enemies


var player = new Player(iniPos.x, iniPos.y);

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