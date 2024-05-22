let fireMask;
let fireVid;

function preload() {
  fireMask = loadImage("assets/fire-mask.png");
  fireVid = createVideo(['assets/fire-snippet.mp4']);
  fireVid.hide(); 
}

function setup() {
  createCanvas(400, 400);
  fireVid.loop();
}

function draw() {
  background("red");
  
  
  image(fireVid, 50, 90, 300, 250)
  
  image(fireMask, 0, 0);
}