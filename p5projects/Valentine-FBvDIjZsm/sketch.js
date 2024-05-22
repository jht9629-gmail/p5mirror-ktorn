/*
* Idea from https://twitter.com/MIT/status/1360971008325406721
* p5.js code by @ktorn
*/

let x = 0;
let y = 0;
let t = 0
let size = 5;

function setup() {
  createCanvas(400, 400);
  background(255);
  fill("red")
  noStroke();
}

function draw() {
  t = frameCount;

  // center origin and rotate canvas 180 degrees
  translate(width / 2, height / 2)
  rotate(PI)

  x = size * (16 * pow(sin(t), 3));
  y = size * (13 * cos(t) - 5 * cos(2 * t) - 2 * cos(3 * t) - cos(4 * t));

  circle(x, y, 5);

}