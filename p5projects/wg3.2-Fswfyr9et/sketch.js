// Recursive tree for WG3.2
// @ktorn
// Adapted from: https://youtu.be/0jjeOYMjmDU

// var angle = 1.37;
var angle = 0.87; // magic number
var slider;

function setup() {
  createCanvas(800, 800);
  
  //slider = createSlider(0, PI, angle, 0.01);
  //strokeCap(SQUARE);
  
  textFont('Courier New');
  strokeWeight(2);
  textAlign(CENTER);
  fill(0)
}

function draw() {
  background("#72ffbe");
  
  stroke(0);
  push();
  translate(width/2, height/2);
  rotate(PI);
  translate(-width/2, -height/2);
  
  if(slider) {
    angle = slider.value();
  }
  
  translate(width/2, height);
  branch(width / 3);
  pop();
  
  textSize(80);
  text('WG3.2', width /2 , height - 50);
  textSize(20);
  strokeWeight(1);
  text('#hicathon', width /2 , height - 20);
  

}

function branch(len) {
  strokeWeight(len/5)
  line(0, 0, 0, -len);
  translate(0, -len);
  if (len > 1) {
    push();
    rotate(angle);
    branch(len * 0.64);
    pop();
    push();
    rotate(-angle);
    branch(len * 0.64);
    pop();
  }
}
