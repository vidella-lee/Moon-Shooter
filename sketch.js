var guy;
var moon;
var heart;
var axis = 0;
var count = 20;
var shot;
var hurt;
var time;
var DeadBug = 0;
var health = 5;
var timeUp = false;
var noTimeUp = false;
var animation1;
var bugs;
var guyBox;
var bullCol;
var bullCol2;
var bullCol3;
var bullCol4;
var test;
var music;
var hPowerUp;
var sPowerUp;
var hPow;
var sPow;
var p1 = true;
var p2 = true;

function preload()
{
  hPowerUp = loadImage("heartPowerUp.png");
  sPowerUp = loadImage("speedPowerUp.png");
  test = loadImage("testBox.png");
  moon = loadImage("moonBackground-1-01.png");
  guy = new Player("Player Sprite Sheet1.png", "Player Sprite Sheet2.png", "Player Sprite Sheet3.png", 20, 550);
  music = loadSound('8-bit Detective.wav');
  shot = loadSound('shot.wav');
  hurt = loadSound('hurt.wav');
  heart = loadImage("heart.png");
  animation1 = loadAnimation("bugFrame1.png", "bugFrame2.png");
}

function setup()
{
  createCanvas(800, 600);
  bullCol = new Group();
  bullCol2 = new Group();
  bullCol3 = new Group();
  bullCol4 = new Group();
  bugs = new Group();
  for(var i = 0; i < count; i++){
    var newBug = createSprite(random(50, width), random(50, 540));
    newBug.addAnimation("wriggle", animation1);
    bugs.add(newBug);
    bugs[i].setCollider("circle", 0, 5, 30);
    bugs[i].setSpeed(random(1, 5), random(0, 360));
    bugs[i].mass = 1;
    //bugs[i].debug = true;
  }

  guyBox = createSprite(guy.x, guy.y, 80, 80);
  guyBox.addImage("t", test);
  guyBox.setCollider("circle", -0, 0, 40)
  //guyBox.debug = true;
  guyBox.immovable = true;

  hPow = createSprite(width/2, height/2);
  hPow.addImage("hlth", hPowerUp);
  hPow.setCollider("circle", 0, 0, 20);

  sPow = createSprite(width/3, height/3);
  sPow.addImage("spd", sPowerUp); 
  sPow.setCollider("circle", 0, 0, 20);

  // sPow.debug = true;
  // hPow.debug = true;

  if(DeadBug != count || timeUp == false || health != 0){
    music.play();
  }
}

function hit(bug, bullet){
  bullet.remove();
  bug.remove();
  DeadBug += 1   ;
}
function hitGuy(bug, guy){
  health -= 1;
  hurt.play();
}

function draw()
{
  textFont("Lucida Console");
  textSize(32);
  imageMode(CORNER);
  background(moon);

/******************DISPLAY HEALTH************************/ 
  if(health == 5){
    image(heart, width - 80, 30);
    image(heart, width - 120, 30);
    image(heart, width - 160, 30);
    image(heart, width - 200, 30);
    image(heart, width - 240, 30);
  }
  else if(health == 4){
    image(heart, width - 80, 30);
    image(heart, width - 120, 30);
    image(heart, width - 160, 30);
    image(heart, width - 200, 30);
  }
  else if(health == 3){
    image(heart, width - 80, 30);
    image(heart, width - 120, 30);
    image(heart, width - 160, 30);
  }
  else if(health ==2){
    image(heart, width - 80, 30);
    image(heart, width - 120, 30);
  }
  else if(health == 1){
    image(heart, width - 80, 30);
  }
/***********************************************/ 
  imageMode(CENTER);

  guyBox.position.x = guy.x;
  guyBox.position.y = guy.y;
  
  sPow.position.x = width/3;
  sPow.position.y = height/2;
  bugs.bounce(bugs);
  bugs.bounce(guyBox);

  if(guy.y < 250){
    guy.stop();
    guy.y += 10;
  }
/************POWERUPS**************/
  if(health > 3){
    hPow.visible = false;
  }
  if(health <= 3){
    hPow.position.x = width/2;
    hPow.position.y = height/2;
    hPow.visible = true;
    
    if(guyBox.overlap(hPow) && p1 == true){
      p1 = false;
      hPow.remove();
      health += 2; 
    }
  }

  if(DeadBug < 5){
    sPow.visible = false;
  }
  if(DeadBug >= 5){
    sPow.visible = true;
    if(guyBox.overlap(sPow) && p2 == true){
      p2 = false;
      guy.frameSpeed = 2;
      sPow.remove();
    }
  }
/*************************************/
/**********MAKE BULLETS MOVE************/
  for(var i = 0; i < bullCol.length; i++){
    bullCol[i].velocity.x = 5;
}
 for(var i = 0; i < bullCol2.length; i++){
    bullCol2[i].velocity.x = -5;
  }
 for(var i = 0; i < bullCol3.length; i++){
    bullCol3[i].velocity.x = 0;
    bullCol3[i].velocity.y = -5;

  }
 for(var i = 0; i < bullCol4.length; i++){
    bullCol4[i].velocity.x = 0;
    bullCol4[i].velocity.y = 5;
  }
/***********************************************/
/****REMOVE BULLETS AND BUGS WHEN THEY COLLIDE****/
  bugs.overlap(bullCol, hit);
  bugs.overlap(bullCol2, hit);
  bugs.overlap(bullCol3, hit);
  bugs.overlap(bullCol4, hit);
/***********************************************/

//IF THE BUGS HIT GUY, PLAYER LOSES HEALTH
  bugs.overlap(guyBox, hitGuy);

//IF THERE ARE LESS THAN A CERTAIN NUMBER OF BUGS, BUGS WILL CHASE PLAYER
for(var i = 0; i < bugs.length; i++){
  if(bugs.length < 7){
      bugs[i].attractionPoint(.2, guy.x, guy.y);
  }
}

/********ALL SPRITES BOUNCE AT EDGES OF SCREEN **********/ 
  for(var i=0; i<allSprites.length; i++) {
  var s = allSprites[i];
  if(s.position.x<0) {
    s.position.x = 1;
    s.velocity.x = abs(s.velocity.x);
  }
  
  if(s.position.x>width) {
    s.position.x = width-1;
    s.velocity.x = -abs(s.velocity.x);
    }
  
  if(s.position.y<0) {
    s.position.y = 1;
    s.velocity.y = abs(s.velocity.y);
  }
  
  if(s.position.y>height) {
    s.position.y = height-1;
    s.velocity.y = -abs(s.velocity.y);
    } 
  }
/***********************************************/
/*****************DRAW SPRITES*****************/ 
  guy.draw();
  drawSprites();
/***********************************************/ 
/******************SHOOT RIGHT************************/
  if(axis == 1){
    if(keyWentDown(' ')){
      var b = createSprite(guy.x, guy.y, 8,8);
      b.setCollider("rectangle", 0, 0, 8, 8);
      bullCol.add(b);
      shot.play();
    }
  }
  /******************SHOOT LEFT*************************/
  if(axis == 2){
    if(keyWentDown(' ')){
      var b = createSprite(guy.x, guy.y, 8,8);
      b.setCollider("rectangle", 0, 0, 8, 8);
      bullCol2.add(b);
      shot.play();
    }
  }
  /********************SHOOT UP**************************/
  if(axis == 3){
    if(keyWentDown(' ')){
      var b = createSprite(guy.x, guy.y, 8,8);
      b.setCollider("rectangle", 0, 0, 8, 8);
      bullCol3.add(b);
      shot.play();
    }
  }
  /********************SHOOT DOWN***********************/
  if(axis == 4){
    if(keyWentDown(' ')){
      var b = createSprite(guy.x, guy.y, 8,8);
      b.setCollider("rectangle", 0, 0, 8, 8);
      bullCol4.add(b);
      shot.play();
    }    
  }
  /***********************************************/

  /*******************TIMER***********************/
  time = millis();
  var sec = round(time/1000);
  var newSec = ((sec+32) - (sec+sec))
  fill(255, 255, 0);

  text("Time: ", 10, 25);
  if(time <= 30000){  
    text(newSec, 150, 25); 
  }

  if(newSec > 25){
    text("KILL THE MOON BUGS!", 250, 300);
  }
  /**********************************************/
  /******************SCORE***********************/
  text("Score: ", width - 250, 25);
  text(DeadBug*100, width - 100, 25);
/***********************************************/

  if(DeadBug == count && health != 0){
    imageMode(CORNER);
    background(moon);
    text("YOU WIN", 330, 300);
    timeUp = false;
  }
  if(newSec != 0 && health == 0){
    imageMode(CORNER);
    background(moon);
     for(var i = bugs.length-1; i >= 0; i--){
        bugs[i].remove();
     }
    text("YOU LOSE", 290, 300);
    timeUp = false;
    noTimeUp = true;
    hPow.remove();
  }
  if(newSec <= 0 && DeadBug != count && noTimeUp == false){
    imageMode(CORNER);
    background(moon);
    timeUp = true
    for(var i = bugs.length-1; i >= 0; i--){
        bugs[i].remove();
     }
  }
    if(timeUp ==true){
     text("TIME'S UP!", 290, 300);
     text("SCORE: ", 290, 380);
     text(DeadBug*100, 450, 380);
     hPow.remove();
   }
/**********************************************/
}

function keyPressed()
{
  if (keyCode === RIGHT_ARROW)
  {
    guy.go(+1, 1);
    axis = 1;
  }
  if (keyCode === LEFT_ARROW)
  {
    guy.go(-1, 1);
    axis = 2;
  }
  if (keyCode === UP_ARROW)
  {
    guy.go(-1, 2);
    axis = 3;   
  }
  if (keyCode === DOWN_ARROW)
  {
    guy.go(+1, 3);
    axis = 4;
  }
}

function keyReleased()
{

  if (keyCode === RIGHT_ARROW)
  {
    guy.stop();
    axis = 1;
  }
  if (keyCode === LEFT_ARROW)
  {
    guy.stop();
  }
  if (keyCode === UP_ARROW)
  {
    guy.stop();
  }
  if (keyCode === DOWN_ARROW)
  {
    guy.stop();
  }
}




// python3 -m http.server 6464

