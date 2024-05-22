let img;
let tiles;
let cols = 5;
let rows = 5;

function preload() {
  img = loadImage('choochoobot.png');
}

function setup() {
  createCanvas(400,400);
  
  tiles = [];
  
  
  for (let i=0; i < cols; i++) {
    for (let j=0; j < rows; j++) {
      
      let tile = new Tile(i , j,
                          img.get(i * width/cols + 1, j * height/rows + 1, width/cols -2 , height/rows - 2));
      
      tiles.push(tile);
    }
  }
  
  tiles.splice(tiles.length - 1, 1);
  
}

function draw() {
  background(0);
  for (let i=0; i < tiles.length; i++) {
    tiles[i].render();
  }
}

function mousePressed()  {
  
}

