function setup() {
  createCanvas(400, 400);
  noLoop();
  angleMode(DEGREES);
}

function draw() {
  background("white");
  
  beginShape();
  
  vertex(200, 50);
  bezierVertex(250, 75,
               150, 100,
              200, 150)
  
  endShape();
}