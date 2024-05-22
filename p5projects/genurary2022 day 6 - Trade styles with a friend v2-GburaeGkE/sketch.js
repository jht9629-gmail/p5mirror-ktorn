/*
 *  Day 5: Trade styles with a friend
 *  by @ktorn
 *  for #genuary2022
 *
 *  Borrowed style from NEURAL HAZE (aka @ twitter profile?)
 *  and had fun packing squares.
 */
let cvn;

// set isBigRender to true to get a large render
// otherwise the render will fit the window size
let isBigRender = false;

const BIG_RENDER_SIZE = 4096;

let size;

let hue;
let sat;
let bri;

let maxVel = 0.1;

const MARGIN = 8;
const MIN_SIZE = 2;

let gridSize;

let pix;

let mainSquare;

let id = 1;

let bgImg;

const DEBUG = false;

function preload() {
  bgImg = loadImage("assets/hicathon-badge.png");
}

function setup() {
  
  if(isBigRender) {
    size = BIG_RENDER_SIZE;
  } else {
    size = windowWidth < windowHeight ? windowWidth : windowHeight;
  }

  cvn = createCanvas(size, size);
  
  bgImg.resize(size, size);

  noStroke();

  init();
}

function init() {
  frameCount = 0;
  hue = random(0, 360);
  sat = random(50, 100);
  bri = random(50, 100);
  let colour = color(hue, 100, 100);
  fill(colour);
  stroke(colour);

  pix = [];

  for (let x = 0; x < size; x++) {
    pix[x] = [];
  }

  squares = [];

  // main square

  mainSquare = new Square(0, 0, size, null);

  for (let xx = mainSquare.x; xx < mainSquare.x + mainSquare.size; xx++) {
    for (let yy = mainSquare.y; yy < mainSquare.y + mainSquare.size; yy++) {
      pix[xx][yy] = mainSquare;
    }
  }
  
  background(0);
  
}


function draw() {

  if(DEBUG) {
    mouseOverlay();
  }
  
  let rX = floor(random(0, size));
  let rY = floor(random(0, size));
    
  let parent = pix[rX][rY];

  parent.addAndRender(rX, rY);

}

function mousePressed() {

  let x = mouseX;
  let y = mouseY;

  let parent = pix[x][y];

  parent.addSquare(x, y);
}

function mouseOverlay() {
  let sq = pix[mouseX][mouseY];

  if (sq) {
    let lCoords = sq.getLocalFromGlobal(mouseX, mouseY);

    let t = "[" + sq.id + "]\n";
    t += "x: " + lCoords.x + " gX: " + mouseX + "\n";
    t += "y: " + lCoords.y + " gY: " + mouseY;

    fill(255);
    text(t, mouseX, mouseY);
  }
}

function keyPressed() {
  saveCanvas("genuary-day-5");
}
