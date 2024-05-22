function preload() {
  img = loadImage("assets/kheiron.jpg");
}

function setup() {
  createCanvas(800, 800);
  
  background(0);
  imageMode(CENTER);
  
  push();
  translate(100, 100);
  image(img, 0, 0, 200, 200);
  pop();
  
  push();
  translate(300, 100);
  scale(-1, 1);
  image(img, 0, 0, 200, 200);
  pop();
  
  push();
  translate(100, 300);
  scale(1, -1);
  image(img, 0, 0, 200, 200);
  pop();
  
  push();
  translate(300, 300);
  scale(-1, -1);
  image(img, 0, 0, 200, 200);
  pop();
  
  push();
  translate(500, 100);
  rotate(PI/2);
  scale(-1, 1);
  image(img, 0, 0, 200, 200);
  pop();
  
  push();
  translate(700, 100);
  rotate(PI/2);
  scale(1, -1);
  image(img, 0, 0, 200, 200);
  pop();
  
  
  push();
  translate(700, 300);
  rotate(PI/2);
  image(img, 0, 0, 200, 200);
  pop();
  
  push();
  translate(500, 300);
  rotate(PI/2);
  scale(-1, -1);
  image(img, 0, 0, 200, 200);
  pop();
  

  
}
