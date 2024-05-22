const DIM = 2048;
const CELLS = 25;
let cvs;

function setup() {
  pixelDensity(1);
  cvs = createCanvas(DIM, DIM);
  
  textSize(9);
  textFont("Courier");
  stroke(255)
  
  let cellSpacing = DIM / CELLS;
  
  let rCol = 0;
  let gCol = 0;
  let bCol = 0;
  
  
  let colGap = 255 / CELLS;
  
  for(let x = 0; x < width; x += cellSpacing) {
    
    
    
    for (let y = 0; y < height; y += cellSpacing) {
      
      rCol = (x / cellSpacing) * colGap;
      bCol = (y / cellSpacing) * colGap;
      
      stroke(210);
      fill(rCol, gCol, bCol);
      rect(x, y, cellSpacing);
      
      noStroke();
      fill(210);
      text(("x: " + int(x) + "\ny: " + int(y)), x + 5, y +10);
    
    }
    
  }
  
}

function keyPressed() {
  
  if(key == 's') {
      save(cvs, "layergrid.png")
  }
}