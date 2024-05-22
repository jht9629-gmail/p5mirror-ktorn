let centreX;
let centreY;
let radius;

let canvasWidth = 800;
let canvasHeight = 800;
let size;
let cvn;

function setup() {
  cvn = createCanvas(canvasWidth, canvasHeight);
  size = canvasWidth < canvasHeight? canvasWidth: canvasHeight;
  centreX = width / 2;
  centreY = height / 2;
  radius = size * 0.666 / 2;
  background(0);
  stroke(255, 255, 255, 5);
}

function draw() { 
  let angle1 = frameCount / 100;
  let angle2 = frameCount / 100 * 2;
  
  let p1x = centreX + cos(angle1) * radius;
  let p1y = centreY + sin(angle1) * radius;
  let p2x = centreX + cos(angle2) * radius;
  let p2y = centreY + sin(angle2) * radius;

  line(p1x, p1y, p2x, p2y);
  
  if(frameCount >= 10000) {
    print("Stopped at frame: " + frameCount);
    noLoop();
  }
}

function keyPressed() {
  saveCanvas(cvn, '10000-chords');
}