var size;

function setup() {
  createCanvas(800, 800);
  size = 200;
}

function draw() {
  background(220);

  fill(255);

  startX = 10;
  startY = 10;

  translate(startX, startY);
  
  var strokeW = 2;

  for (var i = 0; i < 50; i++) {
    strokeW += 2;
    strokeWeight(strokeW);
    
    drawSquare(size);

    rotate(HALF_PI);
    scale(0.618);
    translate(0, -2.618 * size);
  }
}

function drawSquare(size) {
  push();
  push();
  // noStroke();
  rect(0, 0, size, size);
  pop();
  noFill();

  arc(size, size, 2 * size, 2 * size, PI, PI + HALF_PI);
  pop();
}