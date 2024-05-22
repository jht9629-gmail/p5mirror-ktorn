/*  
 *  Day 5: Destroy a Square
 *  by @ktorn
 *  for #genuary2022
 *
 *  Click canvas to generate and destroy a new square.
 */
let space = 0.666;
let cvn;
let size;

let hue;
let sat;
let bri;

let maxVel = 0.1;

let squares;
let gridSize;

function setup() {  
  cvn = createCanvas(windowWidth, windowHeight);
  size = windowWidth < windowHeight? windowWidth: windowHeight;
  size = size * space;
    
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
  
  gridSize = floor(random(2, 10));
  let marginX = width/2 - size/2;
  let marginY = height/2 - size/2;
  let sqSize = size / gridSize;
  
  squares = [];
  
  for (let y = marginY; y < height - marginY - 1; y += sqSize) {
    for (let x = marginX; x < width - marginX - 1; x += sqSize) {
      squares.push( new Square(x, y, sqSize));
    }
  }
}

function draw() {
  
  background(0);
  
  for(let i = 0; i < squares.length; i++) {
    squares[i].render();
    squares[i].move(frameCount);
  }
  
}

function mousePressed() {
  init();
}

function keyPressed() {
  saveCanvas('genuary-day-5');
}

