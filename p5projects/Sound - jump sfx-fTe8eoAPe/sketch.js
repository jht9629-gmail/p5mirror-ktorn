let jump;

function preload() {
  jump = loadSound("assets/jump.wav");
  jump.setVolume(0.2);
}

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
}

function mousePressed() {
  jump.play();
}