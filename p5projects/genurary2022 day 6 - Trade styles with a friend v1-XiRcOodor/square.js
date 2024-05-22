class Square {
  constructor(x, y, size, parent) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.id = id++;
    
    this.gX = x;
    this.gY = y;
    
    if (parent) {
      this.gX = x + parent.gX;
      this.gY = y + parent.gY;
    }

    this.parent = parent;
    this.children = [];
    this.grid = new Grid(this);

    this.hue = random(0, 360);

    this.hl = false;
  }

  render() {
    push();
    translate(this.x, this.y);

    stroke(0);
    strokeWeight(1);

    if(DEBUG) {
      if (this.hl) {
        strokeWeight(3);
        stroke("yellow");
        this.hl = false;

        this.grid.render();

      }
    }
    
    fill(this.hue, 100, 50, 0.5);

    square(0, 0, this.size);


    if(DEBUG) {
      fill(255);
      noStroke();
      textSize(10);
      text(this.id, 10, 10);
      text("x: " + this.x + "\tgX: " + this.gX +
           "\ny: " + this.y + "\tgY: " + this.gY +
           "\ns: " + this.size, 10, 25);
    }
      
    fill(255);
    
    for (let i = 0; i < this.children.length; i++) {
      this.children[i].render();
    }
    
    
    pop();
  }

  highlight() {
    this.hl = true;
    // if(this.parent) {
    //   this.parent.highlight();
    // }
  }

  addSquare(gX, gY) {
    
    let {x, y} = this.getLocalFromGlobal(gX, gY);

    
    print("Adding square within [" + this.id + "] - Global:", gX, gY, ". Local: ", x, y);

    
    let maxSize = this.grid.getMaxSize(x, y);
    
    print("maxSize: ", maxSize)
    

    if (maxSize < MIN_SIZE) {
      return;
    }

    let newSize = floor(maxSize);

    // print("newSize: " + newSize);


    // print("attempting new square: ", newSquare);
    
    let newX = x - floor(newSize / 2);
    let newY = y - floor(newSize / 2);

    if (
      newX < 0 ||
      newX > this.size ||
      newY < 0 ||
      newY > this.size ||
      newX + newSize > this.size ||
      newY + newSize > this.size
    ) {
      print("oops");
      return;
    }
    
    let newSquare = new Square(
      x - floor(newSize / 2),
      y - floor(newSize / 2),
      newSize,
      this
    );
    
    this.children.push(newSquare);
    this.grid.addSquare(newSquare, this);

    
    for (let xx = newSquare.gX; xx < newSquare.gX + newSquare.size; xx++) {
      for (let yy = newSquare.gY; yy < newSquare.gY + newSquare.size; yy++) {
        pix[xx][yy] = newSquare;
      }
    }

    // print("Added child square: ", newSquare.x, newSquare.y, newSquare.size);
  }
  
    
  getGlobalFromLocal(x, y) {
    return {x: x + this.gX, y: y + this.gY};
  }
  
  getLocalFromGlobal(gX, gY) {
    return {x: gX - this.gX, y: gY - this.gY};
  }
}
