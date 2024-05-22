let galoImg;

let grid = 1;
let galoW;
let galoH;

let galoCanvas;

let pixPos;

function preload() {
  galoImg = loadImage('assets/squares.png');
}

function setup() {
  createCanvas(galoImg.width, galoImg.height);
  
  galoCanvas = createGraphics(galoImg.width, galoImg.height);
  galoCanvas.image(galoImg, 0, 0);
  galoCanvas.loadPixels();
  
  image(galoImg, 0, 0);
  
}

function draw() {
  
}

function drawFrame() {
  
  noTint();
  background(255);
  
  galoW = floor(width / grid);
  galoH = floor(height / grid);
  
  let pix;
    
  for (let i = 0; i < width; i += galoW) {
    for (let j = 0; j < height; j += galoH) {
      
      pix = galoImg.get(i, j);
      
//       let col = i + (galoW/2);
//       let row = j + (galoH/2);
      
//       if (col > width) {
//         col = width-1;
//       }
      
//       if (row > height) {
//         row = height - 1;
//       }
      
//       pixPos = (col + row * galoImg.width) * 4;
            
//       pixR = galoCanvas.pixels[pixPos];
//       pixG = galoCanvas.pixels[pixPos+1];
//       pixB = galoCanvas.pixels[pixPos+2]; 
//       pix = color(pixR, pixG, pixB);
      
      tint(pix);
      image(galoImg, i,j, galoW, galoH);
      stroke(255);
      noFill();
      rect(i,j, galoW, galoH);
    }
  }
}

function mousePressed() {
  grid++;
  drawFrame();
}