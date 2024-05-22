var angle1;

var x = 0;
var y = 0;
var borderStep = 5;
 
function setup() {
  createCanvas(400, 400);
  angle1 = 0;
  angle2 = 0;
  background(0);
  colorMode(HSB);
}
 
function draw() {
  push();
  colorMode(RGB);
  background(0, 1);
  pop();
  
  // 
  noFill();
  noStroke();
  ax=200*cos(radians(angle1)) + width/2;
  ay=200*sin(radians(angle1)) + height/2;
  ellipse(x, y, 5, 5);
  

  
  if(x < width && y == 0) {
    x += borderStep;
  } else if(x == width && y < height) {
    y += borderStep
  } else if(y == height && x > 0) {
    x -= borderStep;
  } else if(x == 0 && y > 0) {
    y -= borderStep;
  }
  
  if(x > width) {
    x = width;
  }
  if(y > height) {
    y = height;
  }
      
  stroke(x,y, 30);
  if(frameCount % 5 == 0) {
  	line(x,y, ax, ay);
  }
  
  angle1+=2;
}