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

  
  
  let clockWise = true;
  
  for (let i = 0; i < numberOfRings; i++) {
    let radius = startingRadius + (i*radiusSpacing);
    strokeW += width / 200;
    strokeWeight(strokeW);
    
    let rotAngle = frameCount / 10;
    
    push();
    if(clockWise) {
      rotate(rotAngle);
    } else {
      rotate(-rotAngle);
    }
    
    
    
    for (let angle = 0; angle < 360; angle += angleGap) {

      
      let x = cos(angle) * radius;
      let y = sin(angle) * radius;

      point(x, y);
    }
    pop();
    
    clockWise = !clockWise;
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