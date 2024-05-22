/*  
 *  teia logo v1
 *  by @ktorn
 *
 *  Super-quick experiment. Didn't work as well as intended.
 */

let typeG;

let gridSize = 20;
let gridPadding = 2;
let gridSpacing;
let type = "TEIA";

const DEBUG = true;

function setup() {
  createCanvas(400, 400);
  
  bgG = createGraphics(width, height);
  typeG = createGraphics(width, height);
  
  typeG.rectMode(CENTER);
  typeG.textAlign(CENTER, CENTER);
  typeG.fill(255);
  typeG.stroke(255);
  typeG.textSize(150);
  typeG.textStyle(BOLD);
  
  gridSpacing = floor(width / (gridSize + gridSize * gridPadding));
}

function drawBackground() {
  background(255);
  noStroke();
  fill(0);
  
  for(let x = 0; x < width; x += gridSpacing + gridPadding) {
    for (let y = 0; y < height; y += gridSpacing + gridPadding) {
      rect(x, y, gridSpacing, gridSpacing);
    }
  }
}

function drawType() {
  typeG.background(0);
  typeG.erase();
  typeG.text(type, width/2, height/2);
  typeG.noErase();
  
  if(DEBUG) {
    typeG.push();
    typeG.noStroke();
    typeG.textAlign(LEFT, CENTER);
    typeG.textSize(10);
    typeG.text("gridSize: " + gridSize, 20, height - 30);
    typeG.text("gridPadding: " + gridPadding, 20, height - 20);
    typeG.pop();
  }
  
}

function draw() {
  
  gridSize = floor(map(mouseX, 0, width, 10, 100, true));
  gridPadding = floor(map(mouseY, 0, height, 1, 5, true));
  gridSpacing = floor(width / (gridSize + gridSize * gridPadding));
  
  drawBackground();
  drawType();

  image(typeG, 0, 0);
}