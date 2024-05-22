/*  
 *  Day 8: Single curve only.
 *  by @ktorn
 *  for #genuary2022
 *
 *  Click/touch canvas to create a new curve
 *  Press 'S' to save a screenshot
 */
const SPACE = 0.8;

let lineSpacing;
let cvn;
let sizeW;
let sizeH;

let points;
let lastPoint;
let newPoint;

let margin = 100;

function setup() {  
  
  if (windowWidth < windowHeight) {
    sizeW = windowWidth * SPACE;
    sizeH = sizeW / 1.618033988;
  } else {
    sizeH = windowHeight * SPACE;
    sizeW = sizeH * 1.618033988;
  }
  
  cvn = createCanvas(sizeW, sizeH);
  
  setAttributes('antialias', true);
  
  init();
}


function init() {
 
  points = [];
  
  frameCount = 0;
  
  lastPoint = [random(width), random(height)];
  
  points.push(lastPoint);
  
  strokeWeight(1);
  noFill();
  
  loop();
  

}

function draw() {
  
  background(200);
  
  x  = random(margin, width - margin);
  y =  random(margin, height - margin);

  points.push([x, y]);
  

  curveTightness(-1);
  drawCurve();
 
  if (frameCount > 20) {
    noLoop();
  }

}

function drawCurve() {
  
  if (points.length > 3) {
    beginShape();

    for (let i = 0; i < points.length; i++) {
      curveVertex(points[i][0], points[i][1]);
    }

    endShape();
  }
}

function mousePressed() {
   init();
}

function keyPressed() {
  
  if (keyCode == 83) {
    saveCanvas('genuary-day-8');
  }

}
