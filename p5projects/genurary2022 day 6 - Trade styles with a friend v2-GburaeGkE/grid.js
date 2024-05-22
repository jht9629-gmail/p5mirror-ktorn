class Dim {
  constructor(x, y) {
    this.centerX = x;
    this.centerY = y;
    this.top = y;
    this.bot = y;
    this.left = x;
    this.right = x;
    
    this.indexTop = 0;
    this.indexBot = 0;
    this.indexLeft = 0;
    this.indexRight = 0;
    
    this.crossedOwners = {};
  }
}

// TODO: handle guides shared by 2 or more squares - especially collision detection

class Grid {
  constructor(owner) {
    this.owner = owner;
    
    this.hGuides = [];
    this.vGuides = [];
    
    this.init();
  }
  
  init() {
    this.insert( {value: 0, square: this.owner, side:"LL"}, this.vGuides);
    this.insert( {value: this.owner.size, square: this.owner, side:"RR"}, this.vGuides);
    this.insert( {value: 0, square: this.owner, side: "TT"}, this.hGuides);
    this.insert( {value: this.owner.size, square: this.owner, side: "BB"}, this.hGuides);
  }

  addSquare(s) {
    this.insert( {value: s.x, square: s, side:"L"}, this.vGuides);
    this.insert( {value: s.x + s.size, square: s, side:"R"}, this.vGuides);
    this.insert( {value: s.y, square: s, side:"T"}, this.hGuides);
    this.insert( {value: s.y + s.size, square: s, side: "B"}, this.hGuides);
  }
  
  getMaxSize(x, y) {
    
    let done = false;
    let d = this.initNewDim(x, y);
    
    let safetyTTL = 1000;
    
    while(this.growDim2(d) && safetyTTL > 0) {
      safetyTTL--;
    }
    
    if (safetyTTL == 0) {
      print("##### infinite loop safety triggered!");
    }
    
    let maxSize = d.right - d.left - MARGIN*2;
    
    return maxSize;
  }
  
  initNewDim(x, y) {
    let d = new Dim(x, y);
    
    // set starting horizontal index
    for(let i = 0; i < this.vGuides.length; i++) {
      let vG = this.vGuides[i];
      if (x > vG.value) {
        d.indexLeft = i;
        d.indexRight = i;
      }
    }
    
    // set starting vertical index
    for(let i = 0; i < this.hGuides.length; i++) {
      let hG = this.hGuides[i];
      if (y > hG.value) {
        d.indexTop = i;
        d.indexBot = i;
      }
    }
    
    return d;
  }
  
  
  growDim2(d) {

    if(d.indexTop < 0 || d.indexBot >= this.hGuides.length - 1 ||
       d.indexLeft < 0 || d.indexRight >= this.vGuides.length - 1 ) {
      return false;
    }
    
    // find the shortest distance to the closest guideline and grow that amount
    // 3-steps:
    //   1. find the distance to the next guideline in each of the 4 directions
    //   2. select the shortest of the 4 distances and grow by that amount
    //   3. check if a further growth can take place (return false if not)
    
    let smallestSpace = 0;
    
    // steps 1 & 2
    
    // keep track of these for later, it will help know which square to check collisions against
    let checkSidesForCollision = {top: {check: false},
                                  bot: {check: false},
                                  left: {check: false},
                                  right: {check: false}};
    
    let spaceTop = d.top - this.hGuides[d.indexTop].value;
    smallestSpace = spaceTop;
    checkSidesForCollision.top.square = this.hGuides[d.indexTop].square;
    
    let spaceBot = this.hGuides[d.indexBot+1].value - d.bot;
    if(spaceBot <= smallestSpace) {
      smallestSpace = spaceBot;
      checkSidesForCollision.bot.square = this.hGuides[d.indexBot+1].square;
    }
    
    let spaceLeft = d.left - this.vGuides[d.indexLeft].value;
    if(spaceLeft <= smallestSpace) {
      smallestSpace = spaceLeft;
      checkSidesForCollision.left.square = this.vGuides[d.indexLeft].square;
    }
    
    let spaceRight = this.vGuides[d.indexRight+1].value - d.right;
    if(spaceRight <= smallestSpace) {
      smallestSpace = spaceRight;
      checkSidesForCollision.right.square = this.vGuides[d.indexRight+1].square;
    }
    
    // update indexes
    // these are not if-elses because there's a small chance that
    // more than 1 index needs updating in the same growth step
    
    
    if(smallestSpace == spaceTop) {
      d.indexTop--;
      checkSidesForCollision.top.check = true;
    }
    
    if (smallestSpace == spaceBot) {
      d.indexBot++;
      checkSidesForCollision.bot.check = true;
    }
    
    if (smallestSpace == spaceRight) {
      d.indexRight++;
      checkSidesForCollision.right.check = true;
    }
    
    if (smallestSpace == spaceLeft) {
      d.indexLeft--;
      checkSidesForCollision.left.check = true;
    }
    
    
    // update dim values
    d.top -= smallestSpace;
    d.bot += smallestSpace;
    d.left -= smallestSpace;
    d.right += smallestSpace;
    
    
    // step 3 - check if further growth is possible (collision detection)
    // TODO: this does not handle a rare case where 2 squares create the same guide
        
    let isFutherGrowthPossible = true;
    
    if(checkSidesForCollision.top.check == true &&
       this.isCollision(d.left, d.right, checkSidesForCollision.top.square, 0)) {
        isFutherGrowthPossible = false;
    }
    
    if(checkSidesForCollision.bot.check == true &&
       this.isCollision(d.left, d.right, checkSidesForCollision.bot.square, 0)) {
        isFutherGrowthPossible = false;
    }
    
    if(checkSidesForCollision.left.check == true &&
       this.isCollision(d.top, d.bot, checkSidesForCollision.left.square, 1)) {
        isFutherGrowthPossible = false;
    }
    
    if(checkSidesForCollision.right.check == true &&
       this.isCollision(d.top, d.bot, checkSidesForCollision.right.square, 1)) {
        isFutherGrowthPossible = false;
    }
    
    return isFutherGrowthPossible;
  }
  
  // detects overlap between a line and a square side
  // 'side': 0 for horizontal, 1 for vertical
  isCollision(dimX1, dimX2, square, side) {
    let squareX1, squareX2;
    
    if(side == 0) {
      squareX1 = square.x;
      squareX2 = square.x + square.size;
    } else {
      squareX1 = square.y;
      squareX2 = square.y + square.size;
    }
    
    return (dimX1 < squareX2 && squareX1 < dimX2);
    
  }
  

  insert(element, array) {
    array.push(element);
    array.sort(function (a, b) {
      return a.value - b.value;
    });
    return array;
  }
  
  render() {
    let o = this.owner;
          
    strokeWeight(1);
          
    for(let i = 0; i < this.hGuides.length; i++) {
      let hG = this.hGuides[i];
      
      if(i == 0 || i == this.hGuides.length - 1) {
        stroke("blue");
      } else {
        stroke("green");
      }
      
      line(0, hG.value, o.size, hG.value);
    }
          
    for(let i = 0; i < this.vGuides.length; i++) {
      let vG = this.vGuides[i];
      
      if(i == 0 || i == this.hGuides.length - 1) {
        stroke("white");
      } else {
        stroke("red");
      }
      
      line(vG.value, 0, vG.value, o.size);
    }
      
  }

}
