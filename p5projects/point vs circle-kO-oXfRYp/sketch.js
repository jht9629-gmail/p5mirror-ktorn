function setup() {
  createCanvas(400, 400);
}

function draw() {
  clear();
  translate(width/2, height/2);
  
  noStroke();
  fill(50, 100)
  circle(0, 0, 200);
  
  stroke(50, 100);
  strokeWeight(200);
  point(cos(frameCount/100)*20, 0);
}