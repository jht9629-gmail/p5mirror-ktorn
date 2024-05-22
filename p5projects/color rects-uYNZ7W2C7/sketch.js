let startSize;
let endSize;
let displacementAmount;
let maxRects;
let hue;

function setup() {
  createCanvas(400, 400);
  rectMode(CENTER);
  colorMode(HSB);
  
  hue = random(360);
  noStroke();
  
  startSize = width - 50;
  endSize = 50;
  maxRects = 5;
  displacementAmount = (startSize - endSize) / maxRects;
}

function draw() {
  background(220);
  
  let x = width/2;
  let y = height / 2;
  
  let b = 90;
  let s = 100;
  
  for(let i = startSize; i > endSize; i -= displacementAmount) {
    fill(hue, s, b);
    rect(x, y, i, i, 10);
    x += 20;
    y += 20;
    s -= 20;
  }
}

function mousePressed() {
  hue = random(360);
}