penSize = 5;
slices = 8;
angleSlice = 0
tW = 0;
tH = 0;

function setup() {
  createCanvas(400, 400);
  tW = width /2;
  tH = height / 2;
  background(0);
  angleMode(DEGREES);
  angleSlice = floor(360 / slices);
  colorMode(HSB);
}

function draw() {
  
  let a = width;
  
  let d = dist(mouseX, mouseY, tW, tH);
  let hue = map(d, 0, 200, 0, 360);
  
  stroke(hue, 100, 100, 0.1);
  fill(hue, 100, 100, 0.1);
  
  for(let i = 0; i <= 360; i += angleSlice) {
    push();
      translate(tW, tH);
      rotate(i);
      translate(-tW, -tH);
      circle(mouseX, mouseY, penSize);
    pop();
  }
  


}