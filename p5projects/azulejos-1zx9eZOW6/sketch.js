/*
*  Azulezos
*  by @ktorn
*  24.03.2023
*
*  Only draws a few random circles, everthing else is just tiling.
*  Click canvas to cycle seeds. The first few seeds are curated.
*/

let tile1;
let tile2;
let tile3;
let tile4;

let tileDensity;
let tileSize;
let dim;

let originalTile;

const RENDER_ORIGINAL_TILE = false;  // set to true to render original tile

let curatedSeeds = [837568, 28428418, 69824745, 37843173, 30306240, 39886816, 57654758];

// this is the only function that draws any shapes in this sketch.
// make sure to draw onto t1 graphics
function drawShapes(t1) {
  
  if(RENDER_ORIGINAL_TILE) {
    t1.image(originalTile, 0, 0, t1.width, t1.height);
    return;
  }
  
  t1.background(244, 240, 229);
  t1.stroke(88, 88, 126);
  t1.noFill();
  
  let circles = floor(random(10, 50));
  print("circles: " + circles)
  for(let i = 0; i < circles; i++) {
    t1.strokeWeight(random(1, 8))
    t1.circle(random(-t1.width/2, t1.width*2),
              random(-t1.height/2, t1.height*2),
              random(t1.width/50, t1.width*10));
  }

}

function setup() {
  createCanvas(1600, 1600);
  
  let seed = floor(random()*99999999);
  if (curatedSeeds.length > 0) {
    seed = curatedSeeds.shift();
  }
  print("seed: " + seed);
  randomSeed(seed);
  
  tileDensity = floor(random(5, 10));
  tileDensity = 6
  tileSize = width / tileDensity;

  tile1 = createGraphics(tileSize/2, tileSize/2);       // 1/8 of a tile
  tile2 = createGraphics(tile1.width, tile1.height);    // 1/4 of a tile
  tile3 = createGraphics(tile2.width, tile2.height*2);  // 1/2 of a tile
  tile4 = createGraphics(tile3.width*2, tile3.height);  // whole tile
  
  drawShapes(tile1);
  doTiling();

  noLoop();
  
  print("-----------------")
}

function doTiling() {
  tile1.noStroke();
  tile1.fill(255);
  tile1.erase();
  tile1.triangle(0, tile1.height, tile1.width, 0, tile1.width, tile1.height);
  tile1.noErase();
  
  tile2.image(tile1, 0, 0);
  tile2.translate(0, tile1.height)
  tile2.rotate(PI/2)
  tile2.scale(-1, 1);
  tile2.image(tile1, 0, -tile1.height);
  
  tile3.image(tile2, 0, 0);
  tile3.translate(0, tile2.height);
  tile3.rotate(PI/2)
  tile3.image(tile2, 0, -tile2.height);
  
  tile4.clear();
  tile4.push();
  tile4.translate(tile3.width, 0);
  tile4.image(tile3, 0, 0);
  tile4.scale(-1, 1)
  tile4.image(tile3, 0, 0);
  tile4.pop();
  
  for(let x = 0; x < width; x += tileSize) {
    for(let y = 0; y < height; y += tileSize) {
       image(tile4, x, y);
    }
  }
}

function preload() {
  if(RENDER_ORIGINAL_TILE) {
    // the inspiration for this tiling pattern
    // source: https://www.portugalnummapa.com/azulejos/
    originalTile = loadImage("assets/tile.png");
  }
}


function mousePressed() {
  setup();
}