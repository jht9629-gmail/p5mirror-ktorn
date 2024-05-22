let segments = 32;

function setup() {
  createCanvas(windowWidth, windowHeight, SVG);
  angleMode(DEGREES);
}

function draw() {
  clear();
  
  translate(width/2, height/2);
  
  let angleGap = 360 / segments;
  let startingRadius = width / 13;
  let radiusSpacing = width / 20;
  let numberOfRings = 6;
  let strokeW = width / 400;
  
  
  
  for (let i = 0; i < numberOfRings; i++) {
    let r = startingRadius + (i*radiusSpacing);
    strokeW += width / 200;
    strokeWeight(strokeW);
    
    
    for (let angle = 0; angle < 360; angle += angleGap) {
      let x = r * cos(angle);
      let y = r * sin(angle);

      point(x, y);
    }
  }
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function keyPressed() {
  if(key == 's') {
    save("polar-points");
  }
}