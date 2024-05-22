class MainGuy {
  constructor(x, y, size) {
    this.sprite = createSprite(x, y, size, size);
    this.sprite.debug = true;

  }
}


let mainGuy;
let bgImg;

function preload() {
  bgImg = loadImage("assets/background.jpg");
}




function setup() {
  createCanvas(400, 400);
    
  mainGuy = new MainGuy(width / 2, height / 2, 50, 100);
}

function draw() {
  background(220);
  
  image(bgImg, 0, 0);
  
  drawSprites();

  mainGuy.sprite.velocity.x = (mouseX - mainGuy.sprite.position.x) / 20;
  mainGuy.sprite.velocity.y = (mouseY - mainGuy.sprite.position.y) / 20;
  mainGuy.sprite.velocity.x = (camera.mouseX - mainGuy.sprite.position.x) / 20;
  mainGuy.sprite.velocity.y = (camera.mouseY - mainGuy.sprite.position.y) / 20;

  camera.position.x = mainGuy.sprite.position.x;
  camera.position.y = mainGuy.sprite.position.y;

}
