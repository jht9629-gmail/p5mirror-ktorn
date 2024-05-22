/*  
 *  Day 4: Next Next Fidenza
 *  by @ktorn
 *  for #genuary2022
 *
 *  It 'cheats' by using a fixed set of lines,
 *  but whose points/lines were hand-drawn (pun not intended)
 *  with the help of this sketch.
 *
 *  The overall shape here matters (to me).
 */

let cvn;
let hue = 200;
let points;
let strokeT = 65;
let lineColours;

function setup() {  
  cvn = createCanvas(800, 800);
  colorMode(HSB);
  background(0);
  noStroke();
  strokeCap(SQUARE);
  
  points = [];
  lineColours = [];
  
  prePop();
}


function draw() {  
  background(0);
  
  translate(30, 30);  // couldn't even draw in the centre of the canvas, duh
  
  // you can't see these, but I could, in the making of this sketch
  // kept here because I may need them again.
  fill(0);
  noStroke();
  for (let i = 0; i < points.length; i++) {
    let p = points[i];
    circle(p.x, p.y, 5);
  }
  
  noFill();
  strokeWeight(strokeT);
  colorCount = 0;
  if(points.length > 3) {
    
    // weird loop works surprisingly well
    for(let s = 4; s <= points.length; s += 4) {
      p1 = points[s-4];
      p2 = points[s-3];
      p3 = points[s-2];
      p4 = points[s-1]
      stroke(lineColours[colorCount++]);
      bezier(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y, p4.x, p4.y);
      
      // in case the sketch allows new lines
      if (colorCount >= lineColours.length) {
        colorCount = 0;
      }
    }
  }
}

// used to dump the points used so far (for generating fixed lines)
function keyPressed() {
  print("[");
  for(let i = 0; i < points.length; i++) {
    print("{x: " + points[i].x + ", y: " + points[i].y + "},");
  }
  print("]")
  
}

// the 'cheat'. these were generated my hand-clicking points on the canvas
// and recording them with the help of keyPressed()
function prePop() {
  points = [ 
{x: 292, y: 664}, 
{x: 354, y: 640}, 
{x: 442, y: 638}, 
{x: 520, y: 667}, 
{x: 275, y: 599}, 
{x: 194, y: 559}, 
{x: 140, y: 497}, 
{x: 108, y: 374}, 
{x: 272, y: 539}, 
{x: 288, y: 476}, 
{x: 285, y: 402}, 
{x: 275, y: 355}, 
{x: 264, y: 316}, 
{x: 237, y: 250}, 
{x: 201, y: 167}, 
{x: 169, y: 99}, 
{x: 362, y: 289}, 
{x: 344, y: 195}, 
{x: 324, y: 92}, 
{x: 308, y: 21}, 
{x: 460, y: 300}, 
{x: 463, y: 206}, 
{x: 466, y: 133}, 
{x: 470, y: 73}, 
{x: 607, y: 222}, 
{x: 598, y: 312}, 
{x: 576, y: 389}, 
{x: 561, y: 435}, 
{x: 542, y: 475}, 
{x: 528, y: 524}, 
{x: 519, y: 564}, 
{x: 514, y: 597}
] 
  
  genColours();
}

function genColours() {
  lineColours = [];
  
  for(let s = 4; s <= points.length; s += 4) {
    lineColours.push(color(random(0, 100), 60, 100));
  }
}

function mousePressed() {
  // uncomment to generate new points / lines
  // each new line requires 4 points/clicks
  // points.push({x: mouseX, y: mouseY}); // used for cheat mode
  
  genColours();
}