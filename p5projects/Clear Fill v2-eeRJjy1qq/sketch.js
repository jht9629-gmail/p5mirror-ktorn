// inneficient way to use fill() as a clear()
// by @ktorn

let layer1, layer2;
let hue = 0;
let transparencyColor;

function setup() {
  createCanvas(400, 400);
  
  transparencyColor = color(0, 255, 0); // use "green screen" for transparency

  layer1 = createGraphics(width, height);
  layer2 = createGraphics(100, 100);

  layer1.colorMode(HSB);
  layer1.noStroke();
  
  layer2.noStroke();
  
  updateLayer1();
  updateLayer2();
}

function draw() {
  
  // actual canvas background is black
  background(0);

  // render layer1
  image(layer1, 0, 0);
  
  // render layer2 - which follows the mouse movement
  image(layer2, -layer2.width / 2 + mouseX, -layer2.height / 2 + mouseY);
  
}

function updateLayer1() {
  // layer 1 (base) draws a horizontal rainbow
  for(let i = 0; i < layer1.height; i += layer1.height/7) {
    layer1.fill(hue, 50, 100);
    layer1.rect(0, i, layer1.width, layer1.height/7);
    hue += 360/7;
  }
  if (hue > 360) hue = 0;
}


function updateLayer2() {
  // layer2 draws 2 concentric circles.
  
  // the outer circle is white
  layer2.fill(255, 255);
  layer2.circle(layer2.width / 2, layer2.height / 2, 100);
  
  // the inner circle should be filled with a cross-layer transparency
  // so that we can see through to layer1 (through the white of the outer circle)
  layer2.fill(transparencyColor);
  layer2.circle(layer2.width / 2, layer2.height / 2, 50);

  // this replaces the temporary 'transparencyColor' with actual layer transparency
  processTransparency(layer2, transparencyColor);
}


// this function takes a p5.Graphics and transparency colour
// and sets any pixels that match that colour to be fully transparent
function processTransparency(g, tColor) {
  g.loadPixels();

  let tx = tColor.levels; // transparency 'screen' colour
  let px;

  for (let i = 0; i < g.width; i++) {
    for (let j = 0; j < g.height; j++) {
      px = g.get(i, j);
      
      if(px.toString() == tx.toString()) {
        g.set(i, j, color(0, 0));
      }
    }
  }

  g.updatePixels();
}