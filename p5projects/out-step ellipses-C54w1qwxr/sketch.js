// by ktorn
// 19.11.2022

function setup() {
  createCanvas(800, 800);
  strokeWeight(45);
  stroke(240);
  noFill();
  angleMode(DEGREES);
}

function draw() {
  background(100);
  
  translate(width/2, height/2);
  
  for(let i = 0; i < 11; i++) {
    let w = width*2 - 50 - (i*150);
    let h = w - 40;
    push();
    rotate(frameCount/2 * i / 5);
    ellipse(0, 0, w, h);
    pop();
  }
}