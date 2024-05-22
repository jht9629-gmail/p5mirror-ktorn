// draws a shape whose 'fill' actually clears the pixels, creating a transparency which reveals the layer beneath it
// v3 is a vast improvement on v2, thanks to @sableraph for letting me know about the erase() function
//
// code by @ktorn

let layer1, layer2

let hue = 0;

let rainbowStripes = 7;

function setup() {
  createCanvas(400, 400);
  
  layer1 = createGraphics(width, height);
  layer2 = createGraphics(width, height);
  
  layer1.colorMode(HSB);
  layer1.noStroke();
}

function draw() {
  //background(0);
  
  hue = 0;
  
  // layer 1 (base) draws a horizontal rainbow
  for(let i = 0; i < layer1.height; i += layer1.height/rainbowStripes) {
    layer1.fill(hue, 50, 100);
    layer1.rect(0, i, layer1.width, layer1.height/rainbowStripes);
    hue += 360/rainbowStripes;
  }
  
  layer2.noStroke();
  layer2.fill(255, 255);
  layer2.circle(width/2, height/2, 100);
  layer2.erase();
  layer2.circle(width/2, height/2, 50);
  layer2.noErase();
  
  image(layer1, 0, 0);
  image(layer2, -width/2+mouseX, -height/2+mouseY);
}