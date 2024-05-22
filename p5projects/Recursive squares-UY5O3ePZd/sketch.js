var squares = [];
var sizeLimit = 10;

function setup() {
  createCanvas(400, 400);
  
  rectMode(CENTER);
}

function draw() {
  background(255);
  
  // sizeLimit = map(mouseY, 0, 400, 1, 110);
  squares = [];
  createSquare(width/2, height/2, width/4, height/4);
  

  for(var i=0; i < squares.length; i++) {
    var square = squares[i];
    if (square) {
      square.render();
    }
  }
  
}

function createSquare(squareX, squareY, squareWidth, squareHeight) {

  var square = new Square(squareX, squareY, squareWidth, squareHeight);
  squares.push(square);
  
  if(squareWidth > sizeLimit && squareHeight > sizeLimit) {
    var verticalOffset = squareHeight;
    var horizontalOffset = squareWidth;
    createSquare(squareX, squareY - verticalOffset, squareWidth/2, squareHeight/2);
    createSquare(squareX, squareY + verticalOffset, squareWidth/2, squareHeight/2);
    createSquare(squareX - horizontalOffset, squareY, squareWidth/2, squareHeight/2);
    createSquare(squareX + horizontalOffset, squareY, squareWidth/2, squareHeight/2);
  }
  
}