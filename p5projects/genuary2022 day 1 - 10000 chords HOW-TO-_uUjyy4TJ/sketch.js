let centreX;
let centreY;
let radius;

let canvasWidth = 800;
let canvasHeight = 800;
let size;
let cvn;
let pointCvn;
let lineCvn;

function setup() {
  cvn = createCanvas(canvasWidth, canvasHeight);
  pointCvn = createGraphics(canvasWidth, canvasHeight);
  lineCvn = createGraphics(canvasWidth, canvasHeight);
  size = canvasWidth < canvasHeight? canvasWidth: canvasHeight;
  centreX = width / 2;
  centreY = height / 2;
  radius = size * 0.666 / 2;
  pointCvn.fill(255);
  pointCvn.stroke(255);
  lineCvn.background(0);
  lineCvn.stroke(255, 255, 255, 5);
  stroke(255, 255, 255, 5);
}

function draw() { 
  pointCvn.clear();
  
  let angle1 = frameCount / 100;
  let angle2 = frameCount / 100 * 2;
  
  let p1x = centreX + cos(angle1) * radius;
  let p1y = centreY + sin(angle1) * radius;
  let p2x = centreX + cos(angle2) * radius;
  let p2y = centreY + sin(angle2) * radius;
  
  pointCvn.circle(p1x, p1y, 10);
  pointCvn.circle(p2x, p2y, 10);
  pointCvn.line(p1x, p1y, p2x, p2y);
  
  lineCvn.line(p1x, p1y, p2x, p2y);
  
  image(lineCvn, 0, 0);
  
  if(frameCount >= 10000) {
    print("Stopped at frame: " + frameCount);
    noLoop();
  } else {
    image(pointCvn, 0, 0);
  }
}

function keyPressed() {
  saveCanvas(cvn, '10000-chords');
}