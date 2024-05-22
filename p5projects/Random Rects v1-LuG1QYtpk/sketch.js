/* Random Rects by @ktorn */

let squares = [];

let gridSize = 1;

let hue;
let hueRange = 60;

let instructionsOn = true;

function setup() {
  
  colorMode(HSB);
  hue = random(0, 360);
  
  // size canvas to smallest window dimension
  let canvasDim = windowWidth;
  if (windowHeight < canvasDim) {
    canvasDim = windowHeight;
  }
  
  createCanvas(canvasDim, canvasDim);
  
  initSquares();
}

function draw() {
  
  for(let i = 0; i < squares.length; i++) {
    let sq = squares[i];
    sq.render();
  }
  
  if (instructionsOn) {
    textAlign(CENTER, CENTER);
    textSize(20);
    text("1. Click/touch canvas multiple times to create grid\n\n2. Press any key to save image", width/2, height/2);
  }
    
}

function initSquares() {
  
  squares = [];
  
  let gridWidth = width / gridSize;
  let gridHeight = height / gridSize;
  
  for (let i=0; i < width; i += gridWidth) {
    for (let j=0; j < height; j += gridHeight) {
      let sq = new Square(i, j, gridWidth, gridHeight);
      squares.push(sq);
    }
  }
}

function mousePressed() {
  gridSize++;
  initSquares();
  
  if(instructionsOn) {
    instructionsOn = false;
  }
}

function keyPressed() {
  
  saveCanvas('myCanvas', 'png');
  
}