// test of device rotation in p5js
// by ktorn

let font;

let x, y, z;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  angleMode(DEGREES);

  font = loadFont("assets/Inconsolata.otf");
  textFont(font);
  textSize(20);

  btn = createButton("Press to set orientation permission");

  btn.position(width / 2 - 100, height / 2);

  btn.mousePressed(function () {
    DeviceOrientationEvent.requestPermission();
    btn.hide();
  });
}

function draw() {
  background(255);

  // orientation values provided by web API
  z = -rotationZ;
  x = -rotationX;
  y = rotationY;

  push();

  // Respond to device rotation
  rotateZ(z);
  rotateX(x);
  rotateY(y);

  // Draw a shape
  fill(100, 200, 100);
  box(100, 200, 20); // Example shape

  pop();

  fill(0);
  text("X: " + x, -100, -200);
  text("Y: " + y, -100, -180);
  text("Z: " + z, -100, -160);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
