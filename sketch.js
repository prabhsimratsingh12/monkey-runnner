
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score=0;
var gamestate="play";

function preload(){

  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
}



function setup() {
  
  createCanvas(400, 300);
  
  monkey = createSprite(30,250,400,50);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.1

  
ground = createSprite(1000,290,1000,20);
  ground.x = ground.width /6;
  
   obstaclesGroup = createGroup();
  fruitsGroup = createGroup();
  
  
  
}


function draw() {
  
background("");
  
  

  if(gamestate === "play"){
  
  ground.velocityX = -4;
  
  if (ground.x < 0){
      ground.x = ground.width/6;
    }
  
 spawnObstacles();
  spawnFruits();
  
  text("score: "+score,200,20);
  
  if(monkey.isTouching(obstaclesGroup)){
   gamestate = "End";
   
  }
  
  if(monkey.isTouching(fruitsGroup)){
    score=score+1;
    fruitsGroup.destroyEach();
  }
 
  
    if(keyDown("space") && monkey.y >= 160) {
      monkey.velocityY = -12;
    }
  
    monkey.velocityY = monkey.velocityY + 0.8
  
  monkey.collide(ground);
  }
  
  if(gamestate === "End"){
  
    score=0;
    
     ground.velocityX = 0;
    monkey.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    fruitsGroup.setVelocityXEach(0);
}
  
  
  drawSprites();
}

function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(400,270,50,40);
   obstacle.velocityX = -4;
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300
   obstacle.addImage(obstaceImage)
   obstacle.scale = 0.1
   
   obstacle.debug = true;
   obstacle.setCollider("rectangle",0,0,30,30  )
   
   //add each obstacle to the group
    obstaclesGroup.add(obstacle);
 }
}

function spawnFruits() {
  //write code here to spawn the clouds
  if (frameCount % 80 === 0) {
    var fruit = createSprite(600,120,40,10);
    fruit.y = Math.round(random(80,120));
    fruit.addImage(bananaImage);
    fruit.scale = 0.1;
    fruit.velocityX = -3;
    
     //assign lifetime to the variable
    fruit.lifetime = 200;
    
    //adjust the depth
    fruit.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    //add each cloud to the group
    fruitsGroup.add(fruit);
  }
  
}





