let space = 0.6;
let cvn;
let size;

function setup() {  
  cvn = createCanvas(windowWidth, windowHeight);
  size = windowWidth < windowHeight? windowWidth: windowHeight;
  size = size * space;
  background(0);
}

function draw() {  
  let x = random(0, width);
  let y = random(0, height);
  let d = dist(x, y, width/2, height/2);
  
  r = random(d/50, d/5);
  
  if (d > size/2 + r) {
    circle(x, y, r);
  }
}

function keyPressed() {
  saveCanvas('genuary-space');
}