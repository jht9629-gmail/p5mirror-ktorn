function setup() {
  createCanvas(400, 400);
  noLoop();
  angleMode(DEGREES);
}

function draw() {
  background("antiquewhite");
  
  frame = 50;
  spacingx = 80;
  spacingy = 80;
  rectwidth = spacingx - 2;
  rectheight = spacingy - 2;
  
  noStroke();
  
  for(x = frame; x < 400 - frame; x += spacingx) {
    for(y = frame; y < 400 - frame; y += spacingy) {
      
      fill(map(x, frame, 400 - frame, 1, 255), 50, 50);
      
      rect(x, y, rectwidth, rectheight, random(0, 25), random(0, 25));
    }
  }
}