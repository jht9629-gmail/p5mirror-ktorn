// by ktorn
//
// inspired by https://twitter.com/wikileaks/status/1633384559386722304



let circles = [];
let speedMult = 0.3;


function setup() {
  createCanvas(400, 400);
  
  circles.push( {x: -50, y: 600, size: 500, xspeed: 1, yspeed: -2.5});
  circles.push( {x: -50, y: -250, size: 500, xspeed: 2.5, yspeed: 2.2});
  
  
  stroke(255)
  strokeWeight(2)
  noFill();
}

function draw() {
  background(0);
  
  for (let i = 0; i < circles.length; i++) {
    
    let c = circles[i];
    
    // for (let s = 400; s < c.size; s += 20) {

      circle(c.x, c.y, c.size);

    // }
    
    c.x += c.xspeed * speedMult;
    c.y += c.yspeed * speedMult;
  }
}