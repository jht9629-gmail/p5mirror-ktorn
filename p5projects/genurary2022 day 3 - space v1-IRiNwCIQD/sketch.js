let space = 0.666;
let cvn;
let size;

function setup() {  
  cvn = createCanvas(windowWidth, windowHeight);
  size = windowWidth < windowHeight? windowWidth: windowHeight;
  size = size * space;
  background(220);
}

function draw() {
  
  let x = random(0, width);
  let y = random(0, height);
  let r = random(10, 50);
  
  let d = dist(x, y, width/2, height/2);
  
  if (d > size/2 + r) {
    circle(x, y, r);
  }
}

function keyPressed() {
  saveCanvas('genuary-space');
}