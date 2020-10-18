var PLAY = 1;
var END = 0;
var gameState = PLAY;
var tower, towerImage;
var ghost, ghostImage;
var door, doorImage;
var climber, climberImage;
var doorsGroup, climbersGroup;
var invisibleBlock, invisibleBlocksGroup;



function preload(){
  towerImage = loadImage("tower.png");
  doorImage = loadImage("door.png");
  climberImage = loadImage("climber.png");
  ghostImage = loadImage("ghost-standing.png")
}


function setup(){
  
  createCanvas(600,600);
  
  tower = createSprite(300,300);
  tower.addImage("tower", towerImage);
  tower.velocityY = 1;
  
  ghost = createSprite(200,200,50,50);
  ghost.addImage("ghostStanding", ghostImage);
  ghost.scale = 0.3;
  
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlocksGroup = new Group();
}

function draw() {
  background(0);
  if(gameState === PLAY){
     if(tower.y > 400){
    tower.y = 300;
  }
  
  if(keyDown("space")){
    ghost.velocityY = -10;
  }
  
  ghost.velocityY = ghost.velocityY + 0.8;
  
  if(keyDown("left")){
    ghost.x = ghost.x - 2;
  }
  if(keyDown("right")){
    ghost.x = ghost.x + 2;
  }
  
  
 
  //calling the function
  spawnDoors();
   if(ghost.isTouching(invisibleBlocksGroup)|| ghost.x > 600){
    ghost.destroy();
    gameState = END;
  }
  if(ghost.isTouching(climbersGroup)){
    ghost.velocityY = 0;
  }
  drawSprites();
  
  }
  
  if(gameState === END){
    stroke("yellow");
    fill("yellow"); 
    textSize(30); 
    text("Game Over", 230,250)
  }
 
}

function spawnDoors(){
  
  if(frameCount%240===0){
    door = createSprite(200,-50);
    door.addImage("door", doorImage);
    door.velocityY = 1;
    door.x = Math.round(random(120,400));
    door.lifetime = 800;
    doorsGroup.add(door);
    
    climber = createSprite(200,10);
    climber.addImage("climber",climberImage);
    climber.velocityY = 1;
    climber.x = door.x;
    climber.lifetime = 800;
    climbersGroup.add(climber);
    
    invisibleBlock = createSprite(200,15,climber.width,2);
    invisibleBlock.visible = false;
    invisibleBlock.velocityY = 1;
    invisibleBlock.lifetime = 800;
    invisibleBlock.x =door.x;
    invisibleBlocksGroup.add(invisibleBlock);
  }
}
