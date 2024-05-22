

function setup() {
  createCanvas(400, 400, SVG);

}

function draw() {
  background(210);
  
  translate(width/2, height/2);
  
  strokeWeight(width/4);
  point(0, 0);
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function keyPressed() {
  if(key == 's') {
    save("the-point.png");
  }
}