let x;
let y;

function setup() {
  createCanvas(400, 400);
  rectMode(CENTER);
  x = width / 2;
  y = height / 2;
}

function draw() {
  background(220);
  rotX = rotationX;
  text("RotX: " + rotationX, 10, 20)
  text("RotY: " + rotationY, 10, 40)
  text("RotZ: " + rotationZ, 10, 60)
  
  fill("blue");
  
  x += rotationY;
  y += rotationX;
  
  ellipse(x, y, 50, 50);
}