let frameThickness;
let padding;
let cvn;
let cvnWidth;
let cvnHeight;
let cvnX;
let cvnY;

let mainCnv;
let mainCnvWidth;
let mainCnvHeight;
let mainCnvX;
let mainCnvY;

function setup() {
  mainCnv = createCanvas(400, 400);
  windowResized();
  calculateCanvasDimensions();
  cvn = createGraphics(cvnWidth, cvnHeight);
  cvn.fill(100, 100);
  noiseDetail(5);
}

function draw() {
  cvn.background(220);
  noiseSeed(0);
  
  xoff = frameCount / 200;
  for(let i = 0; i < 100; i++) {
    cvn.circle(noise(xoff+(i*PI), i/2)*cvn.width, noise(xoff, i/2)*cvn.height, width*0.00005);
  }

  // drawBorder();
  image(cvn, cvnX, cvnY);
}

function drawBorder() {
  clear();

  fill(0);
  rect(0, 0, mainCnvWidth, mainCnvHeight);

  fill(255);
  rect(
    frameThickness,
    frameThickness,
    mainCnvWidth - frameThickness * 2,
    mainCnvHeight - frameThickness * 2
  );
}

function calculateCanvasDimensions() {
  frameThickness = mainCnvWidth * 0.07;
  padding = mainCnvWidth * 0.12;
  cvnWidth = mainCnvWidth - (frameThickness * 2 + padding * 2);
  cvnHeight = mainCnvHeight - (frameThickness * 2 + padding * 2);
  cvnX = frameThickness + padding;
  cvnY = cvnX;
  cvn = createGraphics(cvnWidth, cvnHeight);
  
  mainCnvX = width/2 - mainCnvWidth/2;
  mainCnvY = height/2 - mainCnvHeight/2;
}

function windowResized() {
  if (windowWidth < windowHeight) {
    mainCnvWidth = windowWidth*0.9;
    mainCnvHeight = windowWidth*0.9;
  } else {
    mainCnvWidth = windowHeight*0.9;
    mainCnvHeight = windowHeight*0.9;
  }
  
  resizeCanvas(windowWidth, windowHeight);

  calculateCanvasDimensions();
  
  drawBorder();
  
  mainCnv.position(mainCnvX, mainCnvY);
}