var angle1;
var angle2;
 
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
  
  noFill();
  noStroke();
  x=100*cos(radians(angle1)) + width/2.1;
  y=100*sin(radians(angle1)) + height/2.1;
  ellipse(x, y, 5, 5);

  x1=250*cos(radians(angle2)) + width/2;
  y1=500*sin(radians(angle2)) + height/2;
  ellipse(x1, y1, 5, 5);
  
  stroke(x,y, 50);
  if(frameCount % 3 == 0) {
  	line(x,y, x1,y1);
  }
  
  angle1+=2.0;
  angle2+=1.2;
}