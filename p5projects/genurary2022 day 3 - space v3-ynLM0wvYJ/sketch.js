let space = 0.6;
let cvn;
let size;
let hue = 200;

function setup() {  
  cvn = createCanvas(windowWidth, windowHeight);
  size = windowWidth < windowHeight? windowWidth: windowHeight;
  size = size * space;
  colorMode(HSB);
  background(0);
  noStroke();
}

function draw() {  
  let x = random(0, width);
  let y = random(0, height);
  let d = dist(x, y, width/2, height/2);
  
  let r = random(d/100, d/20);
  
  let h = random(hue - 25, hue + 25); 
  let b = map(d, 150, 400, 0, 100);
  let s = 50;
  
  fill(h,s,b, 0.5);
  
  d = dist(x, y, width/2, height/2);
  
  circle(x, y, r);
  
}