let tile1;

class Tile {
  constructor(size, x = 0, y = 0) {
    this.size = size;
    this.x = x;
    this.y = y;
    this.colorR = random(0,255);
    this.colorG = random(0,255);
    this.colorB = random(0,255);
  }

  paintPosSize(x, y, w, h) {
    // rect(x, y, w, h);
    // noFill();
    fill(this.colorR, 0, 255);
    beginShape();
    vertex(x,y);
    vertex
    vertex(x+w,y);
    vertex(x+w,y+(h/4));
    vertex(x+w+(w/3),y+(h/2));
    vertex(x+w,y+(3*(h/4)));
    vertex(x+w,y+h);
    vertex(x,y+h);
    vertex(x,y+(3*(h/4)));
    vertex(x+(w/3),y+(h/2));
    vertex(x,y+(h/4));

    endShape(CLOSE);
  }

  paint() {
    this.paintPosSize(this.x, this.y, this.size, this.size);
  }

  paintPos(x, y) {
    this.paintPosSize(x, y, this.size, this.size);
  }

  paintCentered() {
    this.paintPos(width / 2 - (this.size / 2), height / 2 - (this.size / 2));
  }
  
  debugIt() {
    print("Tile: this.x=" + this.x + " this.y=" + this.y);
  }
}

class Tesselation {

  constructor(templateTile, x, y, w, h) {
    this.templateTile = templateTile;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.tiles = [];
    this.isCreated = false;
  }

  createTesselation() {
    let direction = 1;
    let t = 0;
    for (let i = -this.templateTile.size; i < this.w; i += this.templateTile.size) {
      for (let j = -this.templateTile.size; j < this.h; j += this.templateTile.size) {
        this.tiles[t++] = new Tile(this.templateTile.size, i, j);
      }
      direction = -direction;
    }
    this.isCreated = true;
    print("Created " + t + " tiles");
    
    // for (let k=0; k < t; k++) {
    //   this.tiles[k].debugIt();
    // }
  }

  paint() {
    if (!this.isCreated) {
      this.createTesselation();
    }

    for (let i = 0; i < this.tiles.length; i++) {
      this.tiles[i].paint();
    }
  }
}

function setup() {
  createCanvas(400, 400);
  tile = new Tile(50);
  tesselation = new Tesselation(tile, 0, 0, width, height);
}

function draw() {
  background(220);
  tesselation.paint();
}