/*  
 *  Day 7: Sol LeWitt Wall Drawing.
 *  by @ktorn
 *  for #genuary2022
 *
 *  Click canvas to generate a new wall drawing.
 *  Press 'R' to toggle rotation on/off
 *  Press 'S' to save a screenshot
 */
const SPACE = 0.7;
const LINES = 34;

const COLOUR_PALETTE = ["yellow", "red", "blue"]

const SHAPE_CIRCLE = 0;
const SHAPE_SQUARE = 1;
const SHAPE_TRIANGLE = 2;
const SHAPE_RECTANGLE = 3;
const SHAPE_TRAPEZIUM = 4;
const SHAPE_RHOMBUS = 5;

let colours;
let bgColour;
let line1Colour;
let line2Colour;

let lineSpacing;
let cvn;
let size;
let sizeW;
let sizeH;

let hue;
let sat;
let bri;

let bgCv;  // background canvas
let fgCv;  // foreground canvas

let lines1;
let lines2;

let shape; // the mask

let isRotate = false;
let rotAngle = 90;

function setup() {  
  
  size = windowWidth < windowHeight? windowWidth: windowHeight;
  
  
  sizeW = floor(windowWidth * SPACE);
  sizeH = floor(sizeW / 1.618033988);
  
  if (sizeH >= windowHeight * SPACE) {
    sizeH = floor(windowHeight * SPACE);
    sizeW = floor(sizeH * 1.618033988);
  }

  
  cvn = createCanvas(windowWidth, windowHeight);
  
  fgCv  = createGraphics(sizeW, sizeH);
  
  lines1 = createGraphics(windowWidth*4, windowHeight*4);
  lines2 = createGraphics(windowWidth*4, windowHeight*4);

  angleMode(DEGREES);

  init();
}


function init() {
  colours = COLOUR_PALETTE.slice(0);
  
  bgColour = colours.splice(floor(random() * colours.length), 1);
  line1Colour = colours.splice(floor(random() * colours.length), 1);
  line2Colour = colours.splice(floor(random() * colours.length), 1);
  
  lineSpacing = floor(sizeH / LINES - 1);
  

  drawLines(lines1, true);
  drawLines(lines2, false);
  
  drawFg();
 
}

function draw() {
  
  background(0);
  
  imageMode(CENTER);
  
  if(isRotate) {
    rotAngle += 1/10;
  }
  
  push();
  translate(width/2, height/2);
  rotate(rotAngle)
  translate(-width/2, -height/2);
  image(lines1, width/2, height/2);
  pop();
  
  image(fgCv, width/2, height/2);
  
  drawFrame();
 
}

function mousePressed() {
 init();
}

function keyPressed() {
  
  if (keyCode == 82) {
    isRotate = !isRotate;
  } else if (keyCode == 83) {
    saveCanvas('genuary-day-7');
  }

}

function drawFg () {
  fgCv.background(0);
  fgCv.noStroke();
  fgCv.imageMode(CENTER);
  fgCv.image(lines2, fgCv.width/2, fgCv.height/2);
  fgCv.erase();
  drawMask(fgCv);
  fgCv.noErase();
}

function drawLines(graphics, invert) {
  
  graphics.push();
  graphics.background(0);
  
  graphics.fill(bgColour);
  
  graphics.noStroke();
  graphics.rect(0, 0, graphics.width, graphics.height);
  
  if(invert) {
    graphics.stroke(line1Colour);
  } else {
    graphics.stroke(line2Colour);
  }
  
  graphics.strokeWeight(2);
  
  for(let i = (floor(graphics.height)) / 2; i < graphics.height; i += lineSpacing) {
    graphics.line(0, i , graphics.width, i);
  }
  
  for(let i = (floor(graphics.height) / 2)-lineSpacing; i > 0; i -= lineSpacing) {
    graphics.line(0, i , graphics.width, i);
  }
  
  
  graphics.pop();
  
}

function drawMask(g) {
  
  let shape = floor(random(6))
   if(shape == SHAPE_CIRCLE) {
    g.circle(g.width/2, g.height/2, (LINES-2) * lineSpacing);
  } else if (shape == SHAPE_SQUARE) {
    g.rectMode(CENTER);
    g.square(g.width/2, g.height/2, (LINES-2) * lineSpacing);
  } else if (shape == SHAPE_TRIANGLE) {
    let x1 = g.width/2 - (LINES-2) * lineSpacing / 2;
    let x2 = g.width/2 + (LINES-2) * lineSpacing / 2;
    let y1 = g.height/2 + (LINES-2) * lineSpacing / 2;
    let y2 = g.height/2 - (LINES-2) * lineSpacing / 2;
    g.triangle(x1, y1, x2, y1, g.width/2 , y2);
  } else if (shape == SHAPE_RECTANGLE) {
    g.rectMode(CENTER);
    g.rect(g.width/2, g.height/2, lineSpacing  * 14 + 1, (LINES-2) * lineSpacing - 2);
  } else if (shape == SHAPE_TRAPEZIUM) {
    let x1 = g.width/2 - (LINES-2) * lineSpacing / 2;
    let x2 = g.width/2 + (LINES-2) * lineSpacing / 2;
    let x3 = g.width/2 - (x2-x1)/4;
    let x4 = g.width/2 + (x2-x1)/4;
    let y1 = g.height/2 + (LINES-2) * lineSpacing / 2;
    let y2 = g.height/2 - (LINES-2) * lineSpacing / 2;
    g.quad(x1, y1, x2, y1, x4, y2, x3, y2);
  } else if (shape == SHAPE_RHOMBUS) {
    let x1 = g.width/2 - (LINES-2) * lineSpacing / 2;
    let x2 = g.width/2 + (LINES-2) * lineSpacing / 2;
    let x3 = g.width/2 - (x2-x1)/4;
    let x4 = g.width/2 + (x2-x1)/4;
    let y1 = g.height/2 + (LINES-2) * lineSpacing / 2;
    let y2 = g.height/2 - (LINES-2) * lineSpacing / 2;
    g.quad(x1, y1, x4, y1, x2, y2, x3, y2);
  }
  
}

function drawFrame() {
  fill(0);
  noStroke();
  rectMode(CORNER);
  
  rect(0, height/2 - ((LINES+3)/2*lineSpacing), width, -height/2);
  rect(0, height/2 + ((LINES+3)/2*lineSpacing), width, height/2);
  
  
  
  rect(0, 0, (width - sizeW)/2, height);
  rect(width, 0, -(width - sizeW)/2, height);
}

