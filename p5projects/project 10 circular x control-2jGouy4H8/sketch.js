let particles;
let img;
let littlePoint, bigPoint;

var angle;
var angleStep;
var x;


function preload() {
  img = loadImage('assets/the-starry-night.jpg');
}

function setup() {
  createCanvas(950, 761);
  littlePoint = 4;
  bigPoint = 40;
  let pSize = 2000;
  
  angle = 0;
  angleStep = 1;
  x = 0;

  particles = [];

  for (var i = 0; i <= pSize; i++) {
    particles[i] = new Particle();
  }
  background(0);
}

function draw() {

  
  x = width / 2 * cos(radians(angle)) + width / 2;

  for (var i = 0; i < particles.length; i++) {
    particles[i].display();
    particles[i].move();
  }
  
  angle += angleStep;
  
  
  fill(255);
  ellipse(x, height / 2, 5, 5);
}