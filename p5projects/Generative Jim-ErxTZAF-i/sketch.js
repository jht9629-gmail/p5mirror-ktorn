let jmSource;
let jmCanvas;

let pix;

function preload() {
  jmSource = loadImage("assets/jim-medium.jpeg");
}

function setup() {
  createCanvas(800, 800);
  
  console.log(jmSource.width, jmSource.height);

  jmCanvas = createGraphics(jmSource.width, jmSource.height);
  
  let c;

  for (let col = 0; col < jmSource.width; col += 3) {
    for (let row = 0; row < jmSource.height; row += 3) {
      c = jmSource.get(col, row);
      
      jmCanvas.stroke(c);
      jmCanvas.line(col, row, col + random(-20, 20), row + random(-20, 20));
    }
  }

  console.log("done.");
}

function draw() {
    background(255);
    image(jmCanvas, 0, 0);
}
