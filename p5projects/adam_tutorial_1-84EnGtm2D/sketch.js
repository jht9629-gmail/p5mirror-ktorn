function setup() {
  createCanvas(400, 400);
  noLoop();
}

function draw() {
  background("antiquewhite");
  
  for(a = 0; a < 15; a += 1) {
    strokeWeight(random(1, 5))
    line(50, random(50,350), 350, random(50,350));
  }
}