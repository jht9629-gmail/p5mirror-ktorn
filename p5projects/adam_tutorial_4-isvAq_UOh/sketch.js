function setup() {
  createCanvas(400, 400);
  noLoop();
  angleMode(DEGREES);
}

function draw() {
  background("antiquewhite");
  
  frame = 50;
  spacingx = 1;
  spacingy = 25;
  rectwidth = spacingx - 2;
  rectheight = spacingy - 2;

  y = 200;
  
  for(x = frame; x < 400 - frame; x += spacingx) {
    
    
    y += random(-1, 1);
    
    strokeWeight(random(0, 3))
    
    circle(x, y, 5)
  }
}