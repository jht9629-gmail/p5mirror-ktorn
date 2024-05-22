let img;
let dImg;

let vRes = 50;
let hRes = 50;
let spacing = 0;

function preload() {
  img = loadImage("assets/10000-chords.png");
}

function setup() {
  createCanvas(img.width, img.height);
  dImg = dither(img);
}

function draw() {
  background(220);
  
  image(dImg, 0, 0);
}

function dither(image) {
  img.loadPixels();
  
  out = createGraphics(img.width, img.height);
  out.background(255);
  out.stroke(0);
  out.strokeCap(SQUARE);
  
  vSpacing = out.height / vRes;
  hSpacing = out.width / hRes;
  out.strokeWeight(0);

  
  let pix;
  let w;
  
  for(let y = 0; y < out.height; y += vSpacing) {
    for(let x = 0; x < out.width; x += hSpacing) {
      pix = img.get(x + floor(hSpacing / 2), y + floor(vSpacing / 2));
      w = map(pix[0], 0, 255, vSpacing, 0);
      out.strokeWeight(w);
      out.line(x, y, x + hSpacing, y);
    }
  }

  return out;
}

function keyPressed() {
  saveCanvas('genuary-dither');
}