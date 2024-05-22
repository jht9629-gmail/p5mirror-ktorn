function setup() {
  createCanvas(400, 400);
  noStroke();
  blendMode(ADD);
}

function draw() {
  background(0);
  
  fill(255,0,0);
  circle(100, 300, 300);
  
  fill(0, 255, 0);
  circle(200, 100, 300);
  
  fill(0, 0, 255);
  circle(300, 300, 300);
}