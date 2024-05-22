let jmSource;
let jmCanvas;

let pix;

function preload() {
  jmSource = loadImage("assets/jim-medium.jpeg");
}

function setup() {
  frameRate(60);
  pixelDensity(1);
  
  createCanvas(800, 800);
  
  image(jmSource, 0, 0);
  
  console.log("initializing pix...");
  
  pix = [jmSource.width];
  for (let i = 0; i < jmSource.height; i++) {
    pix[i] = [jmSource.width];
  }
  
  console.log("populating pix from source image...");
  
  for (let row = 0; row < jmSource.height; row++) {
    for (let col = 0; col < jmSource.width; col++) {
      
      pix[row][col] = [4];
      
      let color = jmSource.get(col, row);
      
      pix[row][col][0] = red(color);
      pix[row][col][1] = green(color);
      pix[row][col][2] = blue(color);
      pix[row][col][3] = alpha(color);
      
    }
  }
  
  console.log("pix initialized!");
      
  
  console.log(jmSource.width, jmSource.height);
  
  processImg();

  console.log("done.");
}

function draw() {
    background(255);
    processImg();
    image(jmCanvas, 0, 0);
}

function processImg() {
  jmCanvas = createGraphics(jmSource.width, jmSource.height);
  
  let d = map(mouseX, 0, 400, 1, 20, true);
  
  let c;

  for (let col = 0; col < jmSource.width; col += 5) {
    for (let row = 0; row < jmSource.height; row += 5) {
      c = pix[row][col];
      
      jmCanvas.strokeWeight(2);
      jmCanvas.stroke(c[0], c[1], c[2], c[3]);
      jmCanvas.line(col, row, col + random(-d, d), row + random(-d, d));
    }
  }
}
