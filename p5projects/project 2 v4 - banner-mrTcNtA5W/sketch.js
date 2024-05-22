let img;
let victoryBanner;

let puzzle;
let song;
let canvasSize;
let gridSize;
let pieceSize;
let isCompleted;

let blankCol = 0;
let blankRow = 0;


function preload() {
  img = loadImage('assets/guy.jpg');
  victoryBanner = loadImage('assets/banner.png')
  song = loadSound('Victory Music/epicmusic.mp3')
}

function setup() {
  canvasSize = 400;

  puzzle = [];

  createCanvas(canvasSize, canvasSize);

  gridSize = 2;
  pieceSize = width / gridSize;

  let posAvail = [];

  for (let i = 0; i < gridSize; i++) {

    for (let j = 0; j < gridSize; j++) {

      let pieceImg = img.get(i * pieceSize, j * pieceSize, pieceSize, pieceSize);

      let piece = new Piece(i, j, pieceImg);
      
      let pos = {row: i, col: j}
      posAvail.push(pos);

      puzzle.push(piece);
    }
  }
  
  puzzle.splice(0,1); // remove first piece
  posAvail.splice(0,1);
  
  // shuffle pieces
  for (let i = 0; i < puzzle.length; i++) {
    let piece = puzzle[i];
    let pos = random(posAvail);
    
    let posIndex = posAvail.indexOf(pos); // find the index of the pos
    posAvail.splice(posIndex, 1);
    
    piece.currentRow = pos.row;
    piece.currentCol = pos.col;
  }

}

function draw() {
  background(220);

  for (let k = 0; k < puzzle.length; k++) {

    let piece = puzzle[k];

    piece.render();

    let i = piece.correctRow;
    let j = piece.correctCol;

    //     if (!(i == blankRow && j == blankCol)) {

    //   }
  }
  
  if (isCompleted) {
    image(victoryBanner, 0, 0, width, height);
  }


}


function canMovePiece(piece) {

  let pieceRow = piece.currentRow;
  let pieceCol = piece.currentCol;
  

  if ((pieceCol == blankCol || pieceRow == blankRow) &&
    (abs(pieceCol - blankCol) <= 1 && abs(pieceRow - blankRow) <= 1)
  ) {
    return true;
  } else {
    return false;
  }

}



function mousePressed() {

  for (let i = 0; i < puzzle.length; i++) {

    let piece = puzzle[i];

    if (piece.isMouseOver() && canMovePiece(piece)) {

      let tmpRow = blankRow;
      let tmpCol = blankCol;

      blankRow = piece.currentRow;
      blankCol = piece.currentCol;

      piece.currentRow = tmpRow;
      piece.currentCol = tmpCol;

    }

  }
  
  // check if it is completed
  isCompleted = true;
  
  for(let i = 0; i < puzzle.length; i++) {
    let piece = puzzle[i];
    
    if( ! (piece.currentRow == piece.correctRow &&
       piece.currentCol == piece.correctCol) ) { // is it in the wrong pos
      isCompleted = false;
    }
  }
  
  if (isCompleted) {
    console.log("Victory!");
    
  }
  
  if (isCompleted) {
    song.play()
  }
  
}