let sprites;
let platform;

function setup() {
  createCanvas(800, 400);
  
  platform = createSprite(width / 2, height /2, 50, 50);
  platform.immovable = true;
  
  sprites = Group();
}

function draw() {
  background(255);
  
  sprites.bounce(sprites);
  sprites.bounce(platform);
  
  for(sprite of sprites.toArray()) {
    sprite.attractionPoint(0.5, mouseX, mouseY);
  }
  
  drawSprites();
}

function mousePressed() {
  let s = createSprite(mouseX, mouseY, 10, 10);
  s.maxSpeed = 5;
  s.velocity.x = random(-5, 5);
  s.velocity.y = random(-5, 5);
  
  sprites.add(s);
  
  
}