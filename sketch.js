var tower, towerImg;
var door, doorImg, climber, climberImg;
var doorsG, climbersG;
var ghost, ghostImg;
var invisibleC, invisibleCG;
var gameState = "play";
var spookySound;

function preload(){
  
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookSound = loadSound("spooky.wav");
}

function setup(){
  
  createCanvas(600,600)
  
  tower = createSprite(300,300);
  tower.addImage(towerImg);
  tower.velocityY = 1;
  
  doorsG = new Group();
  climbersG = new Group();
  invisibleCG = new Group();
  
  ghost = createSprite(200,200);
  ghost.addImage(ghostImg);
  ghost.scale = 0.5;
  
  spookSound.play();

  
}

function draw (){

  background("black");
  
 if(gameState === "play"){
   
  if(tower.y > 400){
    
    tower.y = height/2
    
  }
  
  if(keyDown("up_arrow")){
    
    ghost.velocityY = -5
    
  }
  
  if(keyDown("right_arrow")){
    
    ghost.x = ghost.x + 5
  }
  
  if(keyDown("left_arrow")){
    
    ghost.x = ghost.x - 5
  }
  
  ghost.velocityY = ghost.velocityY + 0.8
  
  if(climbersG.isTouching(ghost)){
    
    ghost.velocityY = 0
  }
  
  spawnDoors();

   
   if(invisibleCG.isTouching(ghost)||ghost.y > 600){
     
     ghost.destroy();
     gameState = "end";
   }
     
    drawSprites();
 }
  else if(gameState === "end"){
    
    textSize(30);
    fill("yellow");
    text("Game Over", 250,300);
  }
  
}


function spawnDoors(){
  
  if(frameCount%260===0){
  door = createSprite(200,-60);
  climber = createSprite(200,10);
  invisibleC = createSprite(200,15);
  invisibleC.width = climber.width;
  invisibleC.height = 2;
  
  invisibleC.visible = false;
  
  
  door.addImage(doorImg);
  climber.addImage(climberImg);
    
  door.velocityY = 1;
  climber.velocityY = 1;
  invisibleC.velocityY = 1;
    
  door.x = Math.round(random(120,500))
  climber.x = door.x
  invisibleC.x = climber.x
    
  door.lifetime = 600;
  climber.lifetime = 600;
  invisibleC.lifetime = 600;
    
  doorsG.add(door);
  climbersG.add(climber);
  invisibleCG.add(invisibleC);
    
  door.depth = ghost.depth;   
  ghost.depth += 1  
    
      }
}