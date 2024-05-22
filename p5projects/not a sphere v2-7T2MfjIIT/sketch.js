let orbitCenterX;
let orbitCenterY;

let coords;

let hue;

function setup() {
  createCanvas(400, 400);
  
  colorMode(HSB);
  
  orbitCenterX = width / 2;
  orbitCenterY = height / 2;
  
  hue = 50;
  
  background(0);
}

function draw() { 
  
  // coords = "[" + mouseX + "," + mouseY + "]";
  // fill(0);
  // noStroke(0);
  // rect(0, 0, 100, 100);
  // fill(255);
  // text(coords, 20, 20);
  
  
  let angle1 = random(360) / 50;
  let angle2 = random(360) / 50;
  
  let p1x = orbitCenterX + cos(angle1) * (width * 0.666 / 2);
  let p1y = orbitCenterY + sin(angle1) * (height * 0.666 / 2);
  
  let p2x = orbitCenterX + cos(angle2) * 300;
  let p2y = orbitCenterY + sin(angle2) * 300;  

  
  let d = dist(p1x, p1y, p2x, p2y);

  let strokeB = map(d, 0, 500, 100, 0, true);
  let alpha = map(strokeB, 0, 100, 0, 1);
  
  stroke(hue, 100, strokeB, alpha);
  
  line(p1x, p1y, p2x, p2y);
  
  if(frameCount == 4000) {
    noFill();
    strokeWeight(1);
    let a = 0;
    for(let i = 300; i < width+200; i++) {
      stroke(0, 0, 0, a);
      a += 0.005
      circle(width/2, height/2, i);
    }
    noLoop();
  }
}