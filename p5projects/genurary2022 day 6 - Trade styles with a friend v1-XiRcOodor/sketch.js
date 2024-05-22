/*
 *  Day 5: Trade styles with a friend
 *  by @ktorn
 *  for #genuary2022
 *
 *
 */
let space = 0.666;
let cvn;
let size;

let hue;
let sat;
let bri;

let maxVel = 0.1;

const MARGIN = 5;
const MIN_SIZE = 10;

//let squares;
let gridSize;

let pix;

let mainSquare;

let id = 1;

const DEBUG = true;

function setup() {
  size = windowWidth < windowHeight ? windowWidth : windowHeight;

  cvn = createCanvas(size, size);
  // size = size * space;

  colorMode(HSB);
  angleMode(DEGREES);
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

  // addSquare( mainSquare );

  //   for (let i = 0; i < 100; i++) {
  //     let x = floor(random(0, size));
  //     let y = floor(random(0, size));

  //     let parent = pix[x][y];

  //     parent.addSquare(x, y);
  //   }
}

function addSquare(square) {
  // squares.push(square);
}

function draw() {
  background(255);

  if (
    mouseX > 0 &&
    mouseX < pix.length &&
    mouseY > 0 &&
    mouseY < pix[mouseX].length
  ) {
    pix[mouseX][mouseY].highlight();
  }

  mainSquare.render();

  if(DEBUG) {
    mouseOverlay();
  }

  // for(let i = 0; i < squares.length; i++) {
  //   squares[i].render();
  // }
}

function mousePressed() {
  // init();

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

function highlight() {}
