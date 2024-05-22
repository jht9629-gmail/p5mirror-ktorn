/*
* a happy accident during slit scanning, distilled to its core feature.
*
* by ktorn
*/
let b1;
let b2;

let step = 8;
let distortion = 10;

function setup() {
  createCanvas(800, 800);
  b1 = createGraphics(width / 2, height);
  b2 = createGraphics(width, height);

  b1.fill(0);
  b1.noStroke();
}

function draw() {
  background(255);

  let y = cos(frameCount / 50) * 100;
  b1.clear();
  b1.circle(0, height / 2 + y, 10);
  b2.image(b2, -step, -distortion / 2, b2.width + distortion, b2.height + distortion);
  b2.image(b1, width / 2 + 100, 0);
  b2.background(255, 10);
  image(b2, 0, 0);
}
