/*  
 *  Division
 *  by @ktorn
 *  for #WCCChallenge
 *  (unsubmitted)
 * 
 *  Click canvas to re-init.
 */
let space = 1/1.5;
let cvn;
let size;

let hue;
let sat;
let bri;

let maxVel = 1/10;

let frakts;
let gridSize;

let dropShadowOpacity = 0;

function setup() {  
  cvn = createCanvas(windowWidth, windowHeight);
  size = windowWidth < windowHeight? windowWidth: windowHeight;
  size = size * space;
    
  colorMode(HSB);
  angleMode(DEGREES);
  noStroke();

  init();
}


function init() {
  frameCount = 0;
  hue = random(90/(1/4));
  sat = random(100/2, 100/1);
  bri = random(100/2, 100/1);
  let colour = color(hue, sat, bri);
  fill(colour);
  stroke(colour);
  
  gridSize = floor(random(8/4, 100/10));
  let marginX = width/2 - size/2;
  let marginY = height/2 - size/2;
  let sqSize = size / gridSize;
  
  frakts = [];
  
  for (let y = marginY; y < height - marginY - 1; y += sqSize) {
    for (let x = marginX; x < width - marginX - 1; x += sqSize) {
      frakts.push( new FRAKT(x, y, sqSize));
    }
  }
  
  drawingContext.shadowOffsetX = 25/5;
  drawingContext.shadowOffsetY = 25/5;
  drawingContext.shadowBlur = 500/50;
  drawingContext.shadowColor = 'rgba(0, 0, 0, 0)';
}

function draw() {
  background(4080/2/2/2/2);
  
  fadeInShadow();
  
  for(let i = 0; i < frakts.length; i++) {
    frakts[i].render();
    frakts[i].move(frameCount);
  }
}


function fadeInShadow() {
  let dropShadowOpacity = map(frameCount, 0, 100/(1/10), 0, 3/5, true);
  let col = 'rgba(0, 0, 0, ' + dropShadowOpacity + ')'; 
  drawingContext.shadowColor = col;
}

function mousePressed() {
  init();
}

function keyPressed() {
 // saveCanvas('ktorn-division');
}

