let jmSource;
let jmCanvas;
let jmCanvasProcessed;

let startMillis;
let finishMillis;

function preload() {
  jmSource = loadImage("assets/jim-medium.jpeg");
}

function setup() {
  
  startMillis = millis();
  
  frameRate(60);
  pixelDensity(1);
  
  createCanvas(800, 800);
  

  console.log("initializing pixels...");
  
  jmCanvas = createGraphics(jmSource.width, jmSource.height);
  jmCanvas.image(jmSource, 0, 0);
  jmCanvas.loadPixels();
  
  
  console.log("pix initialized!");
      
  
  console.log(jmSource.width, jmSource.height);
  
  processImg();

  console.log("done.");
}

function draw() {
    background(255);
    processImg();
  
    // image(jmCanvas, 0, 0);
  
  
    image(jmCanvasProcessed, 0, 0);
    // noLoop();
    finishMillis = millis();
    let elapsed = finishMillis - startMillis;
    // console.log("Elapsed: " + elapsed);
}

function processImg() {
  jmCanvasProcessed = createGraphics(jmSource.width, jmSource.height);
  
  let d = map(mouseX, 0, 400, 1, 20, true);
  
  let pixPos;  
  let c;
  
  for (let col = 0; col < jmSource.width; col += 5) {
    for (let row = 0; row < jmSource.height; row += 5) {
      
      pixPos = (col + row * jmSource.width) * 4;
      
      c = jmCanvas.pixels[pixPos];
      
      // jmCanvasProcessed.strokeWeight(2);
      // jmCanvasProcessed.stroke(c);
      jmCanvasProcessed.noStroke();
      jmCanvasProcessed.fill(c, 75);
      // jmCanvasProcessed.line(col, row, col + random(-d, d), row + random(-d, d));
      jmCanvasProcessed.circle(col, row, random(d-1, d+1));
    }
  }
}
