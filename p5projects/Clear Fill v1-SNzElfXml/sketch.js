let layer1, layer2

let hue = 0;

function setup() {
  createCanvas(400, 400);
  
  layer1 = createGraphics(width, height);
  layer2 = createGraphics(width, height);
  
  layer1.colorMode(HSB);
}

function draw() {
  //background(0);
  
  layer1.background(hue++, 50, 100);
  
  if(hue > 360) hue = 0;
  
  layer2.fill(255, 255);
  layer2.circle(width/2, height/2, 100);
  layer2.fill(255, 0);
  // layer2.noFill();
  layer2.circle(width/2, height/2, 50);

  
  image(layer1, 0, 0);
  image(layer2, -width/2+mouseX, -height/2+mouseY);
}