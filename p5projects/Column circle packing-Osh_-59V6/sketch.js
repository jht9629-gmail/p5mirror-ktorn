// Saw something similar yesterday on @sableraph's stream
// and wanted to replicate it. it kind of works.
// did it from memory, so not sure how close it's to the original, or even who was the original author.
//
// by @ktorn
// 04.05.2022

function setup() {
  createCanvas(800, 200);
  fill(255);
  stroke(255);
}

function draw() {
  background(0);
  
  circle(height/2, height/2, height);
  getNextColumn(height, height/2, 1);
}

function getNextColumn(canvasHeight, prevX, colCount) {
  
  if(prevX > width) {
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

