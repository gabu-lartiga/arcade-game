// Enemies our player must avoid
var Enemy = function(_x,_y,_w,_h,_speed) {
    this.x = _x;
    this.y = _y;
    this.width = _w;
    this.height = _h+25;
    this.speed = _speed;
    this.collisionBox = {
        radius: (this.width/3),
        x: (this.x+(this.width/2)),
        y: (this.y+((this.height)/1.8)) }; //collision Box (circle lol)
    this.sprite = 'images/enemy-bug.png';
};
Enemy.prototype.attachCollisionBox = function(_x){
    this.collisionBox.x = _x+(this.width/2);
};
Enemy.prototype.update = function(dt) {
    this.x = this.x + this.speed*dt;
    this.attachCollisionBox(this.x);
};

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    // ctx.beginPath();
    // ctx.arc(this.collisionBox.x, this.collisionBox.y, this.collisionBox.radius,0,2*Math.PI);
    // ctx.stroke();
};

//Player Constructor
var Player = function(_x, _y, _w, _h){ // Player constructor
    this.x = _x;
    this.y = _y;
    this.width = _w;
    this.height = _h+25;
    this.collisionBox = { //collision Box (circle lol)
        radius: (this.width/4.5),
        x: (this.x+((this.width)/2)),
        y: (this.y+(this.height/1.75))
    };
    this.sprite = 'images/char-boy.png';
};

//player initial position
var iniPos = {
    x : (101*2),
    y : (75*5)
};
Player.prototype.attachCollisionBox = function(_x, _y){
    this.collisionBox.x = _x+(this.width/2);
    this.collisionBox.y = _y+(this.height/1.75);
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
    this.attachCollisionBox(this.x,this.y);
    checkCollisions(allEnemies, player);
};
Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    // ctx.beginPath();
    // ctx.arc(this.collisionBox.x, this.collisionBox.y, this.collisionBox.radius,0,2*Math.PI);
    // ctx.stroke();
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

var ey = [58, 141, 224]; // y-axis enemies spawn positions (-25 ~ 0y-axis)
var allEnemies = [];
var enemyCreation = setInterval(createEnemy,1000);
function createEnemy(){
    var indy = Math.floor((Math.random()*3)); //random y-axis spawn position
    var randSpeed = Math.floor((Math.random()*250)+150);
    var enemy = new Enemy(-101, ey[indy], 101, 173, randSpeed);
    allEnemies.push(enemy);
};

function checkCollisions(enemies, player){  //they are actually circles not boxes but collision Box is the standard

    for(var i=0; i < enemies.length; i++){
        var enemy = enemies[i];
        var dx = player.collisionBox.x - enemy.collisionBox.x;
        var dy = player.collisionBox.y - enemy.collisionBox.y;
        var distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < player.collisionBox.radius + enemy.collisionBox.radius) {
            enemies.splice(i, 1);
            player.x=iniPos.x;
            player.y=iniPos.y;
        };
    };
};

//TODO: delete unused(out of canvas) enemies D:!!!


var player = new Player(iniPos.x, iniPos.y,101,173);

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