let orbitCenterX;
let orbitCenterY;
let radius;

let coords;

let hue;

let canvasWidth = 800;
let canvasHeight = 800;
let size;
let cvn;

function setup() {
  cvn = createCanvas(canvasWidth, canvasHeight);
  
  size = canvasWidth < canvasHeight? canvasWidth: canvasHeight;
  
  colorMode(HSB);
  
  orbitCenterX = width / 2;
  orbitCenterY = height / 2;
  
  radius = size * 0.666 / 2;
  
  
  hue = 50;
  
  background(0);
}

function draw() { 
    
  let angle1 = random(2*PI);
  let angle2 = random(2*PI);
  
  let p1x = orbitCenterX + cos(angle1) * radius;
  let p1y = orbitCenterY + sin(angle1) * radius;
  
  let p2x = orbitCenterX + cos(angle2) * radius;
  let p2y = orbitCenterY + sin(angle2) * radius;

  
  let d = dist(p1x, p1y, p2x, p2y);
  
  let maxD = radius*2*1.25;
  
  let strokeB = map(d, 0, maxD, 100, 0, true);
  let alpha = map(strokeB, 0, radius/2, 0, 1);
  
  stroke(hue, 100, strokeB, alpha);
  
  line(p1x, p1y, p2x, p2y);
  
  if(frameCount >= (width * height * 0.003)) {
    print("Stopped at frame: " + frameCount);
    noLoop();
  }
}

function keyPressed() {
  saveCanvas(cvn, 'not-a-sphere');
}