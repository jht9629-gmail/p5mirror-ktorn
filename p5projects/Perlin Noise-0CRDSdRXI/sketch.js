let z = 1;
let divisor = 200;

function setup() {
  createCanvas(400, 400);
  colorMode(HSB);

}

function draw() {
  background(220);

  for (let i = 1; i < width; i += 10) {
    for (let j = 1; j < height; j += 10) {
      let n = noise(i/divisor, j/divisor, z/(divisor*2));
      let hue = map(n, 0, 1, 0, 360);
      
      strokeWeight(10);
      stroke(hue, 200, 200);
      fill(hue, 200, 200);
      
      // point(i,j);
      rect(i, j, 10, 10);
    }
  }
  
  z++;
  
}