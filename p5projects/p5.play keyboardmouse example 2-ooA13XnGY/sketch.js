let hero;
let platform;

var GRAVITY = 1;
var JUMP = 15;

function setup() {
  createCanvas(800, 400);


  hero = createSprite(400, 200, 32, 32);



  hero.addAnimation("stopped", "assets/bmg1_fr1.png");
  hero.addAnimation("walk-up", "assets/bmg1_bk1.png", "assets/bmg1_bk2.png");
  hero.addAnimation("walk-down", "assets/bmg1_fr1.png", "assets/bmg1_fr2.png");
  hero.addAnimation("walk-left", "assets/bmg1_lf1.png", "assets/bmg1_lf2.png");
  hero.addAnimation("walk-right", "assets/bmg1_rt1.png", "assets/bmg1_rt2.png");
  
  
  hero.debug = true;


  platform = createSprite(width / 2, 350, width, 10);
  platform.immovable = true;
  platform.debug = true;

}

function draw() {
  background(255, 255, 255);


  text(hero.velocity.y, 10, 10)
  
  
  if (hero.collide(platform)) {
    hero.velocity.y = 0;
  }
  
  heroFollowMouse();
  updateSpriteAnimations();
  drawSprites();
}


// makes the sprite follow the mouse
function heroFollowMouse() {
  hero.velocity.x = (camera.mouseX - hero.position.x) / 20;
}

function mouseClicked() {
  
  if(hero.velocity.y == 1) {
    hero.position.y = hero.position.y - 1;
    hero.velocity.y = -JUMP;
  }
}


function mouseDragged() {
  heroFollowMouse();
}

function updateSpriteAnimations() {

  if (mouseIsPressed) {
    heroFollowMouse();
  }

  let heroVelX = int(hero.velocity.x);

  hero.velocity.y += GRAVITY;


  if (heroVelX == 0) {
    hero.velocity.x = 0;
  }

  if (heroVelX > 0) {
    hero.changeAnimation("walk-right");
  } else if (heroVelX < 0) {
    hero.changeAnimation("walk-left");
  } else if (heroVelX == 0) {
    hero.changeAnimation("stopped");
  }

}