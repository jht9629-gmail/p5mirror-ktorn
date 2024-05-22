let square1;

let squares = [];

let gridSize = 2;

function setup() {
  createCanvas(400, 400);
  
  let gridWidth = width / gridSize;
  let gridHeight = height / gridSize;
  
  for (let i=0; i < width; i += gridWidth) {
    for (let j=0; j < height; j += gridHeight) {
      let sq = new Square(i, j, gridWidth, gridHeight);
      squares.push(sq);
    }
  }
}

function draw() {
  
  for(let i = 0; i < squares.length; i++) {
    let sq = squares[i];
    sq.render();
  }
    
}