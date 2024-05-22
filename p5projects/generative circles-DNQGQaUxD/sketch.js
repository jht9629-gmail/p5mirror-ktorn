let MAX_DEPTH = 5;

class Element {
  constructor(depth, x, y, size) {
    print("new child")
    this.x = x
    this.y = y
    this.size = size 
    this.depth = depth
    this.child = undefined;
    
    
    print(depth)
    if(depth < MAX_DEPTH) {
      print("running this")
      let childSize = this.size * random(0.7, 0.8);
      let childX = random(-this.size/2.2 + childSize/2, this.size/2.2 - childSize/2);
      let childY = random(-this.size/2.2 + childSize/2, this.size/2.2 - childSize/2);
      this.child = new Element(++depth, childX, childY, childSize)
    }
  }
  
  render() {
    push();
    translate(this.x, this.y);
    circle(0, 0, this.size)
    
    if(this.child) {
      this.child.render();
    }
    pop();
  }
}

let elements = []; 
let gridNum = 20;


function setup() {
  createCanvas(600, 600);
  
  rectMode(CENTER);
  
  let grid = width / gridNum;
  let padding = grid * 0.05
  let elSize = grid - padding * 2;
  
  let elCount = 0;
  
  for (let i = padding + elSize / 2; i < width - padding; i += elSize + padding * 2)
    for(let j = padding + elSize / 2; j < width - padding; j += elSize + padding * 2) {
      elements[elCount++] = new Element(1, i, j, elSize);
    }
}

function draw() {
  background(255);
  
  for(let i = 0; i < elements.length; i++) {
    elements[i].render();
  }
}