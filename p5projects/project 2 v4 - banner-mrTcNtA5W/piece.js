class Piece {
  
  constructor(row, col, img) {
    this.correctRow = row;
    this.correctCol = col;
    this.currentRow = row;
    this.currentCol = col;
    this.img = img;
  }
  
  render() {
    let x = this.currentRow * pieceSize;
    let y = this.currentCol * pieceSize;
    
    if(this.isMouseOver()) {
      tint(0, 153, 204);
    } else {
      noTint();
    }
    
    image(this.img, x, y);
  }
  
  
  isMouseOver() {
    let isMouseOver = false;
    
      let x = this.currentRow * pieceSize;
      let y = this.currentCol * pieceSize;
    
    if (mouseX > x && mouseX < x + this.img.width &&
        mouseY > y && mouseY < y + this.img.height) {
      isMouseOver = true
    }
    
    return isMouseOver;
  }
  
}