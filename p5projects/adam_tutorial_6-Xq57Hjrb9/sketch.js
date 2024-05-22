function setup() {
  createCanvas(400, 400);
  noLoop();
  angleMode(DEGREES);
}

function draw() {
  background("antiquewhite");

  frame = 20;
  spacingx = 20;
  spacingy = 20;
  rectwidth = spacingx - 2;
  rectheight = spacingy - 2;

  noFill();

  for (x = frame; x < 400 - frame*10; x += spacingx) {
    for (y = frame; y < 400 - frame*10; y += spacingy) {
      push();
      translate(x, y);
      
            
      strokeWeight(random(0.5, 3))

      beginShape();

      vertex(x, y);
      bezierVertex(x + random(-50, 50),
                   y + random(-50, 100),
                   x + random(-50, 50),
                   y + random(-50, 50),
                   x,
                   y + random(300)
                   );

      endShape();

      pop();
    }
  }
}
