// Saw something similar yesterday on @sableraph's stream
// and wanted to replicate it. it kind of works.
// did it from memory, so not sure how close it's to the original, or even who was the original author.
//
// 28.02.2023 update: it was a tweet by @MauriceMeilleur:
// https://twitter.com/MauriceMeilleur/status/1519367044721954817
// original work by Asao Tokolo
//
// by @ktorn
// 04.05.2022

const WINDOW_RATIO = 2.11;
const H_MARGIN = 0.08;
const V_MARGIN = 0.33;
const CANVAS_RATIO = 5.11

let originX = 0;
let originY = 0;
let w = 1;
let y = 1;

function setup() {
  createCanvas(1, 1);
  fill(255);
  noStroke();
  windowResized();
  noLoop();
}

function draw() {
  background(0);
  
  translate(originX, originY);
  
  circle(h/2, h/2, h);
  getNextColumn(h, h/2, 1);
}

function getNextColumn(canvasHeight, prevX, colCount) {
  
  if(prevX > w) {
    return;
  }
  
  let diameter = canvasHeight / (colCount + 1);
  let radius = diameter / 2;
  
  let prevDiameter = canvasHeight / colCount;
  let prevRadius = prevDiameter / 2;
  
  let h = prevRadius + radius;
  let c1 = prevRadius / (colCount + 1);
  
  // good old pythagorean theorem seems to help here
  
  let c2 = sqrt(h**2 - c1**2);
  
  let x = prevX + c2;
  
  let d = dist(prevX, prevRadius, x, radius);

  
  for(let i = 0; i < colCount + 1; i++) {
    circle(x, (i * radius*2) + radius, diameter);
  }
  
  
  // only did this sketch because I knew I'd use recursion
  getNextColumn(canvasHeight, x, colCount+1);
}


function calculateDimensions() {
  
  originX = width * H_MARGIN;
  originY = height * V_MARGIN;
  
  w = width - (width * H_MARGIN * 2);
  h = height - (height * V_MARGIN * 2);
  
//   print("width: " + width);
//   print("height: " + height);
  
//   print("w: " + w);
//   print("h: " + h);
}

function windowResized() {
  
  let ratio = windowWidth / windowHeight;
  
  if(ratio < WINDOW_RATIO) {
    resizeCanvas(windowWidth, windowWidth / WINDOW_RATIO);
  } else {
    resizeCanvas(windowHeight * WINDOW_RATIO, windowHeight)
  }
  
  calculateDimensions();
}

function keyPressed() {
  if (key == 's') {
    save("circles");
  }
}

