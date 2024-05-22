
var angle1;
var angle2;
var bubble;
var bg;
 
function setup() {
  createCanvas(400, 400);
  bg = createGraphics(400,400);
  bg.clear();
  angle1 = 0;
  angle2 = 0;
  background(0);
  colorMode(HSB);
  bubble = new Bubble(200, 200, 50);
}
 
function draw() {
  background(255);
  
  bg.push();
  bg.colorMode(RGB);
  bg.background(255, 5);
  bg.pop();
  
  // 
  bg.noFill();
  bg.noStroke();
  x=100*cos(radians(angle1)) + width/2.1;
  y=100*sin(radians(angle1)) + height/2.1;
  bg.ellipse(x, y, 5, 5);
  //
  // fill(0, 0, 111);
  x1=250*cos(radians(angle2)) + width/2;
  y1=500*sin(radians(angle2)) + height/2;
  bg.ellipse(x1, y1, 5, 5);
  
  bg.stroke(x,y, 50);
  if(frameCount % 3 == 0) {
  	bg.line(x,y, x1,y1);
  }
  
  angle1+=2.0;
  angle2+=1.2;
  
    
  image(bg,0,0);
    
  bubble.move();
  bubble.show();
  
}