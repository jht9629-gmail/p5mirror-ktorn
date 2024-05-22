function setup() {
  createCanvas(400, 400);
  noLoop();
  angleMode(DEGREES);
}

function draw() {
  background("antiquewhite");
  
  frame = width * 0.125;
  gridDim = 4;
  padding = width * 0.005;
  w = width - (frame*2) - padding * (gridDim - 1);
  h = height - (frame*2) - padding * (gridDim - 1);
  
  rectwidth = w / gridDim;
  rectheight = h / gridDim;
  
  maxCorner = rectwidth * 0.7;
  
  spacingx = rectwidth + padding;
  spacingy = rectheight + padding;
  
  noStroke();
  
  for(x = frame; x < width - frame; x += spacingx) {
    for(y = frame; y < height - frame; y += spacingy) {
      
      fill(map(x, frame, width - frame, 1, 255), 50, 50);
      
      rect(x, y, rectwidth, rectheight, random(maxCorner), random(maxCorner));
    }
  }
}